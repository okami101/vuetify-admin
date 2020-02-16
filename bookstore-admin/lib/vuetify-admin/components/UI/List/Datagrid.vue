<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="itemsPerPage"
    :footer-props="{
      'items-per-page-options': rowsPerPage,
      showFirstLastPage: true
    }"
    :server-items-length="total"
    :loading="loading"
    :options.sync="options"
    :multi-sort="multiSort"
    :show-select="showSelect"
    v-model="selected"
    @update:items-per-page="updateQuery"
    @update:page="updateQuery"
    @update:sort-by="updateQuery"
    @update:sort-desc="updateQuery"
  >
    <template v-slot:top>
      <v-toolbar flat color="blue lighten-5" v-if="selected.length">
        {{ $tc("va.datagrid.selected_items", selected.length) }}
        <v-spacer></v-spacer>
        <div>
          <va-delete-button @delete="onBlukDelete"></va-delete-button>
        </div>
      </v-toolbar>
      <v-toolbar flat v-else>
        <form-filter
          :filters="enabledFilters"
          @remove="disableFilter"
          v-model="currentFilter"
        ></form-filter>
        <v-spacer></v-spacer>
        <v-menu offset-y v-if="disabledFilters.length">
          <template v-slot:activator="{ on }">
            <v-btn text color="primary" v-on="on">
              <v-icon small class="mr-2">mdi-filter-variant-plus</v-icon>
              {{ $t("va.datagrid.add_filter") }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(filter, index) in disabledFilters"
              :key="index"
              @click="enableFilter(filter)"
            >
              <v-list-item-title>{{
                filter.text || $t(`attributes.${filter.source}`)
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <va-create-button v-if="canCreate"></va-create-button>
        <va-export-button
          text
          v-if="canExport"
          :options="options"
          :filter="{ ...filter, ...currentFilter }"
        ></va-export-button>
      </v-toolbar>
    </template>
    <template
      v-for="slot in Object.keys($scopedSlots)"
      v-slot:[`item.${slot}`]="scope"
    >
      <slot :name="slot" v-bind="scope"></slot>
    </template>
    <template v-slot:item.action="{ item }">
      <slot name="action">
        <va-show-button :resource="item"></va-show-button>
        <va-edit-button :resource="item"></va-edit-button>
        <va-delete-button
          :resource="item"
          @deleted="loadData()"
        ></va-delete-button>
      </slot>
    </template>
  </v-data-table>
</template>

<script>
import FormFilter from "./FormFilter";
import { mapState, mapActions } from "vuex";
import EventBus from "../../../utils/eventBus";

export default {
  name: "Datagrid",
  components: {
    FormFilter
  },
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    filter: {
      type: Object,
      default: () => {}
    },
    filters: {
      type: Array,
      default: () => []
    },
    canCreate: {
      type: Boolean,
      default: true
    },
    canExport: {
      type: Boolean,
      default: true
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    rowsPerPage: {
      type: Array,
      default: () => [5, 10, 25, 50, 100, 200]
    },
    multiSort: {
      type: Boolean,
      default: true
    },
    showSelect: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      currentFilter: {},
      currentFields: [],
      currentFilters: [],
      items: [],
      total: 0,
      options: {},
      selected: []
    };
  },
  mounted() {
    this.initFiltersFromQuery();

    EventBus.$on("refresh", () => {
      this.loadData();
    });
  },
  beforeDestroy() {
    EventBus.$off("refresh");
  },
  computed: {
    ...mapState({
      resourceName: state => state.api.resourceName
    }),
    enabledFilters() {
      return this.currentFilters.filter(f => {
        return f.alwaysOn || f.active;
      });
    },
    disabledFilters() {
      return this.currentFilters.filter(f => {
        return !f.alwaysOn && !f.active;
      });
    },
    headers() {
      return [
        { value: "id", text: "ID", align: "right" },
        ...this.currentFields.map(field => {
          return {
            ...field,
            text: field.label || this.$t(`attributes.${field.source}`),
            value: field.source
          };
        }),
        { value: "action", sortable: false }
      ];
    }
  },
  watch: {
    options: {
      handler() {
        this.loadData();
      },
      deep: true
    },
    fields: {
      handler(val) {
        this.currentFields = val.map(f => {
          return typeof f === "string"
            ? {
                source: f
              }
            : f;
        });
      },
      deep: true,
      immediate: true
    },
    filters: {
      handler(val) {
        this.currentFilters = val.map(f => {
          return typeof f === "string"
            ? {
                source: f
              }
            : f;
        });
      },
      deep: true,
      immediate: true
    },
    currentFilter: {
      handler() {
        this.loadData();
        this.updateQuery();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      getList: "api/getList",
      deleteMany: "api/deleteMany"
    }),
    initFiltersFromQuery() {
      /**
       * Apply current route query into datagrid filter
       */
      const { perPage, page, sortBy, sortDesc, filter } = this.$route.query;

      this.options = {
        ...this.options,
        perPage: perPage ? parseInt(perPage, 10) : 1,
        page: page ? parseInt(page, 10) : 1,
        sortBy: sortBy ? sortBy.split(",") : [],
        sortDesc: sortDesc
          ? sortDesc.split(",").map(bool => bool === "true")
          : []
      };

      if (filter) {
        this.currentFilter = JSON.parse(filter);

        for (let prop in this.currentFilter) {
          let filter = this.currentFilters.find(f => f.source === prop);

          if (filter) {
            filter.active = true;
          }
        }
        this.currentFilters = [...this.currentFilters];
      }
    },
    enableFilter(filter) {
      filter.active = true;
      this.currentFilters = [...this.currentFilters];
    },
    disableFilter(filter) {
      filter.active = false;
      this.currentFilters = [...this.currentFilters];
    },
    updateQuery() {
      /**
       * Update query router
       */
      this.$router
        .push({
          query: {
            perPage: this.options.itemsPerPage,
            page: this.options.page,
            sortBy: this.options.sortBy.join(","),
            sortDesc: this.options.sortDesc.join(","),
            filter: JSON.stringify(this.currentFilter)
          }
        })
        .catch(e => {});
    },
    async loadData() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;

      let { data, total } = await this.getList({
        fields: ["id", ...this.currentFields.map(item => item.source)],
        pagination: {
          page,
          perPage: itemsPerPage
        },
        sort: sortBy.map((by, index) => {
          return { by, desc: sortDesc[index] };
        }),
        filter: {
          ...this.filter,
          ...this.currentFilter
        }
      });

      this.loading = false;
      this.items = data;
      this.total = total;
    },
    async onDelete(item) {
      this.loadData();
    },
    async onBlukDelete() {
      if (
        await this.$confirm(
          this.$t("va.confirm.delete_many_title", {
            resource: this.$tc(
              `resources.${this.resourceName}`,
              this.selected.length
            ).toLowerCase(),
            count: this.selected.length
          }),
          this.$t("va.confirm.delete_many_message", {
            resource: this.$tc(
              `resources.${this.resourceName}`,
              this.selected.length
            ).toLowerCase(),
            count: this.selected.length
          })
        )
      ) {
        await this.deleteMany({ ids: this.selected.map(({ id }) => id) });
        this.selected = [];
        this.loadData();
      }
    }
  }
};
</script>
