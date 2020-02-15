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
        <v-row>
          <v-col sm="auto">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="$t('va.datagrid.search')"
              single-line
              hide-details
              dense
              v-if="canSearch"
              @input="onSearch"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <va-create-button v-if="canCreate"></va-create-button>
        <va-export-button
          text
          v-if="canExport"
          :options="options"
          :filter="filter"
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
import debounce from "lodash/debounce";
import { mapState, mapActions } from "vuex";
import EventBus from "../../../utils/eventBus";

export default {
  name: "Datagrid",
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    canSearch: {
      type: Boolean,
      default: true
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
      search: null,
      loading: false,
      items: [],
      total: 0,
      options: {},
      selected: []
    };
  },
  mounted() {
    /**
     * Apply current route query into datagrid filter
     */
    const { search, perPage, page, sortBy, sortDesc } = this.$route.query;
    this.search = search;
    this.options = {
      ...this.options,
      perPage: perPage ? parseInt(perPage, 10) : 1,
      page: page ? parseInt(page, 10) : 1,
      sortBy: sortBy ? sortBy.split(",") : [],
      sortDesc: sortDesc ? sortDesc.split(",").map(bool => bool === "true") : []
    };

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
    headers() {
      return [
        { value: "id", text: "ID", align: "right", sortable: true },
        ...this.fields.map(field => {
          return {
            text: this.$t(`attributes.${field.value}`),
            ...field
          };
        }),
        { value: "action", sortable: false }
      ];
    },
    filter() {
      let filter = {};

      if (this.search) {
        filter.search = this.search;
      }
      return filter;
    }
  },
  watch: {
    options: {
      async handler() {
        this.loadData();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      getList: "api/getList",
      deleteMany: "api/deleteMany"
    }),
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
            search: this.search
          }
        })
        .catch(e => {});
    },
    async loadData() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;

      let { data, total } = await this.getList({
        fields: ["id", ...this.fields.map(item => item.value)],
        pagination: {
          page,
          perPage: itemsPerPage
        },
        sort: sortBy.map((by, index) => {
          return { by, desc: sortDesc[index] };
        }),
        filter: this.filter
      });

      this.loading = false;
      this.items = data;
      this.total = total;
    },
    onSearch: debounce(function() {
      this.loadData();
      this.updateQuery();
    }, 200),
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
