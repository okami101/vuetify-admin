<template>
  <v-card>
    <va-aside-content>
      <slot
        name="aside"
        :resource="resource"
        v-bind="{ items, total, selected }"
      ></slot>
    </va-aside-content>
    <v-data-iterator
      :items="items"
      :server-items-length="total"
      :loading="loading"
      :options.sync="options"
      v-model="selected"
      :items-per-page="itemsPerPage"
      :footer-props="{
        'items-per-page-options': rowsPerPage,
        showFirstLastPage: true
      }"
      @update:items-per-page="loadDataAndQuery"
      @update:page="loadDataAndQuery"
      @update:sort-by="loadDataAndQuery"
      @update:sort-desc="loadDataAndQuery"
      @edit="onUpdateItem"
    >
      <template v-slot:header>
        <v-toolbar flat color="blue lighten-5" v-if="selected.length">
          {{ $tc("va.datagrid.selected_items", selected.length) }}
          <v-spacer></v-spacer>
          <div>
            <va-delete-button
              :resource="resource"
              @delete="onBlukDelete"
            ></va-delete-button>
          </div>
        </v-toolbar>
        <v-toolbar flat color="transparent" v-else>
          <form-filter
            :filters="getEnabledFilters"
            @remove="disableFilter"
            v-model="currentFilter"
          ></form-filter>
          <v-spacer></v-spacer>
          <v-menu offset-y v-if="getDisabledFilters.length">
            <template v-slot:activator="{ on }">
              <v-btn text color="success" v-on="on">
                <v-icon small class="mr-2">mdi-filter-variant-plus</v-icon>
                {{ $t("va.datagrid.add_filter") }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(filter, index) in getDisabledFilters"
                :key="index"
                @click="enableFilter(filter)"
              >
                <v-list-item-title>{{ filter.label }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <va-create-button :resource="resource"></va-create-button>
          <va-export-button
            :resource="resource"
            v-if="exporter"
            text
            :options="options"
            :filter="{ ...filter, ...currentFilter }"
          ></va-export-button>
        </v-toolbar>
      </template>
      <template v-slot:default>
        <slot
          :resource="resource"
          :items="items"
          :fields="getFields.filter(f => !f.hidden)"
          :value="selected"
          :server-items-length="total"
          :loading="loading"
          :items-per-page="itemsPerPage"
        ></slot>
      </template>
      <template v-slot:loading>
        <slot :resource="resource" :items-per-page="itemsPerPage"></slot>
      </template>
      <template v-slot:no-data>
        <slot :resource="resource" :items-per-page="itemsPerPage"></slot>
      </template>
      <template v-slot:no-results>
        <slot :resource="resource" :items-per-page="itemsPerPage"></slot>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script>
import debounce from "lodash/debounce";
import FormFilter from "../List/FormFilter";
import { mapActions } from "vuex";
import Page from "vuetify-admin/mixins/page";
import EventBus from "vuetify-admin/utils/eventBus";

export default {
  name: "List",
  components: {
    FormFilter
  },
  mixins: [Page],
  props: {
    resource: {
      type: String,
      required: true
    },
    filter: {
      type: Object,
      default: () => {}
    },
    filters: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    },
    itemsPerPage: {
      type: Number,
      default: 15
    },
    rowsPerPage: {
      type: Array,
      default: () => [5, 10, 15, 25, 50, 100]
    },
    exporter: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      items: [],
      total: 0,
      options: {},
      selected: [],
      currentFilter: {},
      enabledFilters: []
    };
  },
  created() {
    this.initFiltersFromQuery();

    EventBus.$on("refresh", () => {
      this.loadData();
    });
  },
  mounted() {
    this.loadData();
  },
  beforeDestroy() {
    EventBus.$off("refresh");
  },
  computed: {
    getFields() {
      return this.getFormattedFields(this.fields);
    },
    getFilters() {
      return this.getFormattedFields(
        this.filters.map(f => {
          if (f === "q") {
            return {
              source: "q",
              alwaysOn: true,
              options: { icon: "mdi-magnify" }
            };
          }
          return f;
        })
      );
    },
    getEnabledFilters() {
      return this.getFilters.filter(f => {
        return this.enabledFilters.includes(f.source);
      });
    },
    getDisabledFilters() {
      return this.getFilters.filter(f => {
        return !this.enabledFilters.includes(f.source);
      });
    }
  },
  watch: {
    filters: {
      handler() {
        /**
         * Pre-enable "alwaysOn" filters
         * This filters cannot be removed
         */
        this.enabledFilters = this.getFilters
          .filter(f => f.alwaysOn)
          .map(f => f.source);
      },
      deep: true,
      immediate: true
    },
    currentFilter() {
      this.loadDataAndQuery();
    }
  },
  methods: {
    ...mapActions({
      getList: "api/getList",
      update: "api/update",
      updateMany: "api/updateMany",
      deleteMany: "api/deleteMany"
    }),
    getFormattedFields(fields) {
      return fields
        .map(f => {
          return typeof f === "string"
            ? {
                source: f
              }
            : f;
        })
        .map(f => {
          return {
            ...f,
            type: f.type || "text",
            label: f.label || this.$t(`attributes.${f.source}`)
          };
        });
    },
    initFiltersFromQuery() {
      /**
       * Apply current route query into datagrid filter
       */
      const { perPage, page, sortBy, sortDesc, filter } = this.$route.query;

      this.options = {
        ...this.options,
        page: page ? parseInt(page, 10) : 1,
        itemsPerPage: perPage ? parseInt(perPage, 10) : this.itemsPerPage,
        sortBy: sortBy ? sortBy.split(",") : [],
        sortDesc: sortDesc
          ? sortDesc.split(",").map(bool => bool === "true")
          : []
      };

      if (filter) {
        this.currentFilter = JSON.parse(filter);

        for (let prop in this.currentFilter) {
          let filter = this.getFilters.find(f => f.source === prop);

          if (filter) {
            this.enableFilter(filter);
          }
        }
      }
    },
    enableFilter(filter) {
      this.enabledFilters.push(filter.source);
    },
    disableFilter(filter) {
      this.enabledFilters.splice(this.enabledFilters.indexOf(filter.source), 1);
    },
    updateQuery() {
      /**
       * Update query router
       */
      let { itemsPerPage, page, sortBy, sortDesc } = this.options;
      this.$router
        .push({
          query: {
            perPage: itemsPerPage,
            page,
            sortBy: sortBy.join(","),
            sortDesc: sortDesc.join(","),
            filter: JSON.stringify(this.currentFilter)
          }
        })
        .catch(e => {});
    },
    loadDataAndQuery() {
      this.loadData();
      this.updateQuery();
    },
    async loadData() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;

      let { data, total } = await this.getList({
        resource: this.resource,
        params: {
          fields: this.getFields.map(f => f.source),
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
              `resources.${this.resource}`,
              this.selected.length
            ).toLowerCase(),
            count: this.selected.length
          }),
          this.$t("va.confirm.delete_many_message", {
            resource: this.$tc(
              `resources.${this.resource}`,
              this.selected.length
            ).toLowerCase(),
            count: this.selected.length
          })
        )
      ) {
        await this.deleteMany({
          resource: this.resource,
          params: { ids: this.selected.map(({ id }) => id) }
        });
        this.selected = [];
        this.loadData();
      }
    },
    async onUpdateItem({ item, source, val }) {
      this.update({
        resource: this.resource,
        params: {
          id: item.id,
          data: {
            [source]: val
          }
        }
      });
    }
  }
};
</script>
