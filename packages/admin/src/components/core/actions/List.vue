<template>
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
        <form
          class="d-flex align-center"
          v-if="association"
          @submit.prevent="onAssociate"
        >
          <va-autocomplete-input
            :label="$tc(`resources.${resource}.name`, 1)"
            :resource="resource"
            :reference="resource"
            v-model="associationId"
            hide-details
            :filled="false"
          ></va-autocomplete-input>
          <va-associate-button type="submit"></va-associate-button>
        </form>
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
        <va-create-button
          v-if="!disableCreate"
          :resource="resource"
          :disable-route="disableCreateRoute"
          @click="onCreate"
        ></va-create-button>
        <slot name="actions"></slot>
        <va-export-button
          v-if="!disableExport"
          :resource="resource"
          text
          :options="options"
          :filter="{ ...filter, ...currentFilter }"
        ></va-export-button>
      </v-toolbar>
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
</template>

<script>
import Resource from "../../../mixins/resource";
import FormFilter from "../../core/list/FormFilter";
import isEmpty from "lodash/isEmpty";
import { mapState, mapActions } from "vuex";

/**
 * List data iterator component, perfect for list CRUD page as well as any resource browsing standalone component.
 * Allow resource paginating and filtering. Use current query string context for initial state by default.
 * The main list layout is fully customizable and can be used for Datagrid separate component.
 * @displayName VaList
 */
export default {
  mixins: [Resource],
  components: {
    FormFilter,
  },
  props: {
    /**
     * Internal filter, always active and not modifiable through UI.
     * Sent to your data provider inside `filter` params.
     */
    filter: {
      type: Object,
      default: () => {},
    },
    /**
     * Exposed filters, editable through advanced filter form, update URL query string if not disabled.
     * Sent to your data provider inside `filter` params.
     */
    filters: {
      type: Array,
      default: () => [],
    },
    /**
     * List of fields to select for API side. Support dot notation for nested fields.
     * Sent to your data provider inside `fields` params.
     */
    fields: {
      type: Array,
      default: () => [],
    },
    /**
     * List of sorted fields, can be multiple.
     * Sent to your data provider inside `sort` params.
     */
    sortBy: {
      type: Array,
      default: () => [],
    },
    /**
     * List of sort state for each sorted fields, only `boolean`, `true` if sorted as `DESC`.
     * Sent to your data provider inside `sort` params.
     */
    sortDesc: {
      type: Array,
      default: () => [],
    },
    /**
     * Related resources to include within current resource for API side. Allow eager-loading on demand.
     * Sent to your data provider inside `include` params.
     */
    include: {
      type: Array,
      default: () => [],
    },
    /**
     * Maximum number of items to show in the list for each page.
     * Sent to your data provider inside `pagination.perPage` params.
     */
    itemsPerPage: {
      type: Number,
      default: 15,
    },
    /**
     * List of available selections of items per page.
     */
    rowsPerPage: {
      type: Array,
      default: () => [5, 10, 15, 25, 50, 100],
    },
    /**
     * List of current selected items.
     */
    value: {
      type: Array,
      default: () => [],
    },
    /**
     * Vuetify context state of the list with current page and sorting.
     */
    options: {
      type: Object,
      default: () => {},
    },
    /**
     * Disable real time update of URL query string on any browsing action as pagination, sorting, filtering, etc.
     */
    disableQueryString: Boolean,
    /**
     * Disable pagination.
     */
    disablePagination: Boolean,
    /**
     * Do not redirect to create route on create button and only use `create` event.
     */
    disableCreateRoute: Boolean,
    hideHeader: Boolean,
    disableCreate: Boolean,
    disableExport: Boolean,
    association: {
      type: Object,
      default: () => {},
    },
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
      associationId: null,
    };
  },
  async mounted() {
    await this.initFiltersFromQuery();
    this.loaded = true;
    this.fetchData();
  },
  computed: {
    ...mapState({
      refresh: (state) => state.api.refresh,
    }),
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
    refresh(newVal) {
      if (newVal) {
        this.fetchData();
      }
    },
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
      update: "api/update",
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
        let lastIndex = s.lastIndexOf(".");

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
    onCreate() {
      let title = this.$t("resources.users.titles.create");

      this.$emit("action", { action: "create", title });
    },
    async onAssociate() {
      await this.update({
        resource: this.resource,
        params: {
          id: this.associationId,
          data: {
            [`add_${this.association.source}`]: this.association.id,
          },
        },
      });

      this.fetchData();
      this.$emit("associated", this.associationId);
      this.associationId = null;
    },
  },
};
</script>
