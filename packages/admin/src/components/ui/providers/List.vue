<template>
  <v-data-iterator
    :items="listState.items"
    :loading="listState.loading"
    :options.sync="listState.options"
    :value="listState.selected"
    :server-items-length="listState.total"
    :items-per-page="itemsPerPage"
    :hide-default-footer="hideDefaultFooter || disablePagination"
    :footer-props="{
      'items-per-page-options': itemsPerPageOptions,
      showFirstLastPage: true,
      disableItemsPerPage,
    }"
    @update:items-per-page="listState.reload"
    @update:page="listState.reload"
  >
    <template v-slot:header v-if="!hideHeader">
      <v-toolbar flat color="blue lighten-5" v-if="listState.selected.length">
        {{ $tc("va.datatable.selected_items", listState.selected.length) }}
        <v-spacer></v-spacer>
        <div>
          <!-- @slot Custom bulk actions, ideal place for VaBulkActionButton. -->
          <slot name="bulk.actions"></slot>
          <va-bulk-delete-button></va-bulk-delete-button>
        </div>
      </v-toolbar>
      <v-toolbar flat v-else>
        <form
          class="d-flex align-center"
          v-if="association"
          @submit.prevent="onAssociate"
        >
          <va-autocomplete-input
            :label="$admin.getResource(resource).singularName"
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
            <!-- @slot Custom component filters. -->
            <slot :name="`filter.${filter.source}`" v-bind="props"></slot>
          </template>
        </form-filter>
        <v-spacer></v-spacer>
        <v-menu offset-y v-if="getDisabledFilters.length">
          <template v-slot:activator="{ on }">
            <v-btn
              text
              color="success"
              v-on="on"
              :icon="!$vuetify.breakpoint.lgAndUp"
            >
              <v-icon small>mdi-filter-variant-plus</v-icon>
              <span v-if="$vuetify.breakpoint.lgAndUp" class="ml-2">{{
                $t("va.datatable.add_filter")
              }}</span>
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
          :disable-redirect="disableCreateRedirect"
          :resource="resource"
          @click="onAction('create')"
        ></va-create-button>
        <!-- @slot Put here some global action with components based on VaActionButton. -->
        <slot name="actions"></slot>
        <va-export-button
          v-if="!disableExport"
          :resource="resource"
          text
          :options="listState.options"
          :filter="getCurrentFilter"
        ></va-export-button>
      </v-toolbar>
    </template>
    <template v-slot:default>
      <!--
        @slot Main list layout placeholder. Mainly for VaDataTable but can be anything else.
        @binding {string} resource Name of resource.
        @binding {array} items Result of data fetched from API.
        @binding {boolean} loading Loading indicator.
        @binding {number} total Total count from server-side.
      -->
      <slot v-bind="listState"></slot>
    </template>
    <template v-slot:loading>
      <slot :resource="resource" :loading="listState.loading"></slot>
    </template>
    <template v-slot:no-data>
      <slot :resource="resource"></slot>
    </template>
    <template v-slot:no-results>
      <slot :resource="resource"></slot>
    </template>
    <template v-slot:footer>
      <!-- @slot Best place for any custom pagination. -->
      <slot
        name="footer"
        :options="listState.options"
        :total="listState.total"
        :items-per-page="itemsPerPage"
        :items-per-page-options="itemsPerPageOptions"
        :disable-items-per-page="disableItemsPerPage"
      ></slot>
    </template>
  </v-data-iterator>
</template>

<script>
import Resource from "../../../mixins/resource";
import Search from "../../../mixins/search";
import FormFilter from "../../internal/FormFilter";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

/**
 * List data iterator component, perfect for list CRUD page as well as any resource browsing standalone component.
 * Allow resource paginating and filtering. Use current query string context for initial state by default.
 * The list layout on default slot is fully customizable and can be used for separate `VaDataTable` component.
 */
export default {
  mixins: [Resource, Search],
  components: {
    FormFilter,
  },
  provide() {
    return {
      listState: this.listState,
    };
  },
  props: {
    /**
     * Exposed filters, editable through advanced filter form, update URL query string if not disabled.
     * Sent to your data provider inside `filter` params.
     * Use specific `alwaysOn` property for each filter you want to be visible and not removable.
     * Valid properties are `source`, `type`, `label`, `alwaysOn`, `attributes`.
     */
    filters: {
      type: Array,
      default: () => [],
    },
    /**
     * List of available selections of items per page.
     */
    itemsPerPageOptions: {
      type: Array,
      default() {
        return (
          get(this.$admin.options, "list.itemsPerPageOptions") || [
            5,
            10,
            15,
            25,
            50,
            100,
          ]
        );
      },
    },
    /**
     * Disable real time update of URL query string on any browsing action as pagination, sorting, filtering, etc.
     */
    disableQueryString: Boolean,
    /**
     * Hide default footer, notably default pagination.
     */
    hideDefaultFooter: Boolean,
    /**
     * Disable pagination, will hide default footer.
     */
    disablePagination: Boolean,
    /**
     * Hide all header toolbar, so neither filters nor any create or export actions.
     */
    hideHeader: Boolean,
    /**
     * Force disabling of create button, shown by default if create resource action available.
     */
    disableCreate: Boolean,
    /**
     * Disable the export button.
     * The export allows client-side CSV download and keep active filters while disabling pagination.
     */
    disableExport: {
      type: Boolean,
      default() {
        return get(this.$admin.options, "list.disableExport") || false;
      },
    },
    /**
     * Disable create redirection. Will force create button to show.
     */
    disableCreateRedirect: Boolean,
    /**
     * Disable the global search.
     */
    disableGlobalSearch: {
      type: Boolean,
      default() {
        return get(this.$admin.options, "list.disableGlobalSearch") || false;
      },
    },
    /**
     * Key parameter of the global search query.
     */
    globalSearchQuery: {
      type: String,
      default: "q",
    },
    /**
     * Association infos object in case of this list is related to a current show or edit resource page.
     * Enable the association between resources directly by an autocomplete an associate action.
     */
    association: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loaded: false,
      currentFilter: {},
      enabledFilters: [],
      associationId: null,
      listState: {
        resource: this.resource,
        items: [],
        loading: false,
        total: 0,
        selected: [],
        options: {},
        reload: () => {
          this.fetchData();
          this.updateQuery();
        },
      },
    };
  },
  async mounted() {
    await this.initFiltersFromQuery();
    this.loaded = true;
    this.fetchData();
  },
  computed: {
    getCurrentFilter() {
      /**
       * Get clean filter, do not take empty value but booleans
       */
      return Object.keys(this.currentFilter).reduce((o, key) => {
        let value = this.currentFilter[key];

        return {
          ...o,
          ...((!isEmpty(value) ||
            typeof value === "number" ||
            typeof value === "boolean") && {
            [key]: value,
          }),
        };
      }, {});
    },
    getFilters() {
      let filters = [];

      if (!this.disableGlobalSearch) {
        /**
         * Add global search filter
         */
        filters = [
          {
            source: this.globalSearchQuery,
            label: this.$t("va.datatable.search"),
            alwaysOn: true,
            attributes: { appendIcon: "mdi-magnify" },
          },
        ];
      }

      return [...filters, ...this.filters]
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
              this.$admin.getSourceLabel(this.resource, f.labelKey || f.source),
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
    filter: {
      handler(newVal) {
        this.currentFilter = newVal || {};
      },
      immediate: true,
      deep: true,
    },
    "$store.state.api.refresh"(newVal) {
      if (newVal) {
        this.fetchData();
      }
    },
    "listState.options"(val) {
      /**
       * Triggered on pagination change.
       */
      this.$emit("update:options", val);
    },
    currentFilter(newVal) {
      this.fetchData();
      this.updateQuery();

      /**
       * Triggered on filter change.
       */
      this.$emit("update:filter", newVal);
    },
  },
  methods: {
    async initFiltersFromQuery() {
      let options = {
        page: 1,
        itemsPerPage: this.itemsPerPage,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
      };

      if (this.disableQueryString) {
        this.listState.options = options;
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

      this.listState.options = options;

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
      if (this.disableQueryString || isEmpty(this.listState.options)) {
        return;
      }

      /**
       * Update query router
       */
      let { itemsPerPage, page, sortBy, sortDesc } = this.listState.options;
      let query = {
        page,
        ...(!this.disableItemsPerPage && { perPage: itemsPerPage }),
      };

      if (!isEmpty(sortBy)) {
        query.sortBy = sortBy.join(",");
      }

      if (!isEmpty(sortDesc)) {
        query.sortDesc = sortDesc.join(",");
      }

      if (!isEmpty(this.getCurrentFilter)) {
        query.filter = JSON.stringify(this.getCurrentFilter);
      }

      this.$router.push({ query }).catch(() => {});
    },
    async fetchData() {
      if (!this.loaded || isEmpty(this.listState.options)) {
        return;
      }

      this.listState.loading = true;

      const { sortBy, sortDesc, page, itemsPerPage } = this.listState.options;

      let params = {
        fields: this.getFieldsQuery(this.resource, this.fields),
        include: isEmpty(this.include)
          ? this.currentResource.include
          : this.include,
        sort: (sortBy || []).map((by, index) => {
          return { by, desc: sortDesc[index] };
        }),
        filter: this.getCurrentFilter,
      };

      if (!this.disablePagination) {
        params.pagination = {
          page,
          ...(!this.disableItemsPerPage && { perPage: itemsPerPage }),
        };
      }

      /**
       * Load paginated and sorted data list
       */
      let { data, total } = await this.$store.dispatch(
        `${this.resource}/getList`,
        params
      );

      /**
       * Update state without cloning
       */
      let newState = {
        items: data,
        loading: false,
        total,
        selected: [],
        options: this.listState.options,
      };

      for (let key in newState) {
        this.listState[key] = newState[key];
      }
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
         * Recursively for nested relation
         */
        let relation = s.substr(0, lastIndex);
        let f = fields[relation] || [];
        fields[relation] = [...f, s.substr(lastIndex + 1)];
      });
      return fields;
    },
    async onDelete() {
      this.fetchData();
    },
    onAction(action) {
      if (!this.disableCreateRedirect) {
        return;
      }

      /**
       * Allows you to use global action event for custom action on your side.
       */
      this.$emit("action", {
        action,
        title: this.currentResource.getTitle("create"),
      });
    },
    async onAssociate() {
      await this.$store.dispatch(`${this.resource}/update`, {
        id: this.associationId,
        data: {
          [`add_${this.association.source}`]: this.association.id,
        },
      });

      this.fetchData();

      /**
       * Triggered on successful association of resource item.
       */
      this.$emit("associated", this.associationId);
      this.associationId = null;
    },
  },
};
</script>
