<template>
  <div>
    <va-aside-content>
      <slot name="aside" v-bind="{ items, total, selected: value }"></slot>
    </va-aside-content>
    <v-data-iterator
      :items="items"
      :server-items-length="total"
      :loading="loading"
      :options.sync="currentOptions"
      :value="value"
      :items-per-page="itemsPerPage"
      :hide-default-footer="disablePagination"
      :footer-props="{
        'items-per-page-options': rowsPerPage,
        showFirstLastPage: true,
      }"
      @input="(selected) => $emit('input', selected)"
    >
      <template v-slot:header v-if="!hideHeader">
        <v-card :flat="flat">
          <v-toolbar flat color="blue lighten-5" v-if="value.length">
            {{ $tc("va.datagrid.selected_items", value.length) }}
            <v-spacer></v-spacer>
            <div>
              <slot name="bulk.actions"></slot>
              <va-bulk-delete-button
                :resource="resource"
                :value="value"
                @input="(value) => $emit('input', value)"
              ></va-bulk-delete-button>
            </div>
          </v-toolbar>
          <v-toolbar flat v-else>
            <form-filter
              :filters="getEnabledFilters"
              @remove="disableFilter"
              v-model="currentFilter"
            >
              <template
                v-for="filter in getEnabledFilters"
                v-slot:[filter.source]="props"
              >
                <slot :name="`filter.${filter.source}`" v-bind="props"></slot>
              </template>
            </form-filter>
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
            <slot name="actions"></slot>
            <va-export-button
              :resource="resource"
              v-if="exporter"
              text
              :options="options"
              :filter="{ ...filter, ...currentFilter }"
            ></va-export-button>
          </v-toolbar>
        </v-card>
      </template>
      <template v-slot:default>
        <slot
          v-bind="{ resource, items, loading, itemsPerPage }"
          :server-items-length="total"
        >
        </slot>
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
  </div>
</template>

<script>
import Resource from "vuetify-admin/mixins/resource";
import isEmpty from "lodash/isEmpty";
import FormFilter from "../List/FormFilter";
import { mapState, mapActions } from "vuex";
import EventBus from "vuetify-admin/utils/eventBus";

export default {
  name: "List",
  mixins: [Resource],
  components: {
    FormFilter,
  },
  props: {
    /**
     * Internal filter
     */
    filter: {
      type: Object,
      default: () => {},
    },
    /**
     * Exposed filters
     */
    filters: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Array,
      default: () => [],
    },
    sortBy: {
      type: Array,
      default: () => [],
    },
    sortDesc: {
      type: Array,
      default: () => [],
    },
    include: {
      type: Array,
      default: () => [],
    },
    flat: Boolean,
    itemsPerPage: {
      type: Number,
      default: 15,
    },
    rowsPerPage: {
      type: Array,
      default: () => [5, 10, 15, 25, 50, 100],
    },
    value: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => {},
    },
    exporter: {
      type: Boolean,
      default: true,
    },
    disableQueryString: Boolean,
    disablePagination: Boolean,
    hideHeader: Boolean,
  },
  data() {
    return {
      loaded: false,
      loading: false,
      items: [],
      total: 0,
      currentOptions: {},
      currentFilter: {},
      enabledFilters: [],
    };
  },
  async mounted() {
    await this.initFiltersFromQuery();
    this.loaded = true;
    this.fetchData();

    EventBus.$on("refresh", () => {
      this.fetchData();
    });
  },
  beforeDestroy() {
    EventBus.$off("refresh");
  },
  computed: {
    getFilters() {
      return this.filters
        .map((f) => {
          if (f === "q") {
            return {
              source: "q",
              label: this.$t("va.datagrid.search"),
              alwaysOn: true,
              options: { icon: "mdi-magnify" },
            };
          }
          return f;
        })
        .map((f) => {
          return typeof f === "string"
            ? {
                source: f,
              }
            : f;
        })
        .map((f) => {
          return {
            ...f,
            type: f.type || "text",
            label:
              f.label ||
              this.$t(`resources.${this.resource}.fields.${f.source}`),
          };
        });
    },
    getEnabledFilters() {
      return this.getFilters.filter((f) => {
        return f.alwaysOn || this.enabledFilters.includes(f.source);
      });
    },
    getDisabledFilters() {
      return this.getFilters.filter((f) => {
        return !f.alwaysOn && !this.enabledFilters.includes(f.source);
      });
    },
  },
  watch: {
    options: {
      handler(val) {
        this.currentOptions = val;
      },
      immediate: true,
    },
    currentOptions(val) {
      this.fetchData();
      this.updateQuery();
      this.$emit("update:options", val);
    },
    currentFilter() {
      this.fetchData();
      this.updateQuery();
    },
  },
  methods: {
    ...mapActions({
      getList: "api/getList",
    }),
    async initFiltersFromQuery() {
      let options = {
        page: 1,
        itemsPerPage: this.itemsPerPage,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
      };

      if (this.disableQueryString) {
        this.currentOptions = options;
        return;
      }

      /**
       * Apply current route query into options
       */
      const { perPage, page, sortBy, sortDesc, filter } = this.$route.query;

      if (page) {
        options.page = parseInt(page, 10);
      }

      if (perPage) {
        options.itemsPerPage = parseInt(perPage, 10);
      }

      if (sortBy) {
        options.sortBy = sortBy.split(",");
      }

      if (sortDesc) {
        options.sortDesc = sortDesc.split(",").map((bool) => bool === "true");
      }

      this.currentOptions = options;

      /**
       * Enable active filters from query
       */
      if (filter) {
        this.currentFilter = JSON.parse(filter);

        for (let prop in this.currentFilter) {
          let filter = this.getFilters.find((f) => f.source === prop);

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
      if (this.disableQueryString || isEmpty(this.currentOptions)) {
        return;
      }

      /**
       * Update query router
       */
      let { itemsPerPage, page, sortBy, sortDesc } = this.currentOptions;
      let query = {
        perPage: itemsPerPage,
        page,
      };

      if (!isEmpty(sortBy)) {
        query.sortBy = sortBy.join(",");
      }

      if (!isEmpty(sortDesc)) {
        query.sortDesc = sortDesc.join(",");
      }

      if (!isEmpty(this.currentFilter)) {
        query.filter = JSON.stringify(this.currentFilter);
      }

      this.$router.push({ query }).catch((e) => {});
    },
    async fetchData() {
      if (!this.loaded || isEmpty(this.currentOptions)) {
        return;
      }

      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.currentOptions;

      let params = {
        fields: this.getFieldsQuery(this.resource, this.fields),
        include: this.include,
        sort: (sortBy || []).map((by, index) => {
          return { by, desc: sortDesc[index] };
        }),
        filter: {
          ...this.filter,
          ...this.currentFilter,
        },
      };

      if (!this.disablePagination) {
        params.pagination = {
          page,
          perPage: itemsPerPage,
        };
      }

      /**
       * Load paginated and sortad data list
       */
      let { data, total } = await this.getList({
        resource: this.resource,
        params,
      });

      this.loading = false;
      this.items = data;
      this.total = total;
    },
    getFieldsQuery(resource, sources, fields = {}) {
      sources.forEach((s) => {
        /**
         * Dot notation support
         */
        var lastIndex = s.lastIndexOf(".");

        if (lastIndex === -1) {
          /**
           * This is simple field
           * Add simple field to main resource
           */
          let f = fields[resource] || [];
          fields[resource] = [...f, s];
          return;
        }

        /**
         * This is field of relation
         * Recurcivity for nested relation
         */
        let relation = s.substr(0, lastIndex);
        let f = fields[relation] || [];
        fields[relation] = [...f, s.substr(lastIndex + 1)];
      });
      return fields;
    },
    async onDelete(item) {
      this.fetchData();
    },
  },
};
</script>
