<template>
  <v-data-iterator
    :items="items"
    :server-items-length="total"
    :loading="loading"
    :options.sync="currentOptions"
    :value="value"
    :items-per-page="itemsPerPage"
    :hide-default-footer="hideDefaultFooter || disablePagination"
    :footer-props="{
      'items-per-page-options': itemsPerPageOptions,
      showFirstLastPage: true,
    }"
    @input="onSelect"
  >
    <template v-slot:header v-if="!hideHeader">
      <v-toolbar flat color="blue lighten-5" v-if="value.length">
        {{ $tc("va.datatable.selected_items", value.length) }}
        <v-spacer></v-spacer>
        <div>
          <!-- @slot Custom bulk actions, ideal place for VaBulkActionButton -->
          <slot name="bulk.actions"></slot>
          <va-bulk-delete-button
            :resource="resource"
            :value="value"
            @input="onSelect"
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
            <v-btn text color="success" v-on="on">
              <v-icon small class="mr-2">mdi-filter-variant-plus</v-icon>
              {{ $t("va.datatable.add_filter") }}
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
          :options="options"
          :filter="currentFilter"
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
      <slot
        v-bind="{ resource, items, loading }"
        :server-items-length="total"
      ></slot>
    </template>
    <template v-slot:loading>
      <slot :resource="resource" :loading="loading"></slot>
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
        :options="currentOptions"
        :total="total"
        :items-per-page="itemsPerPage"
        :items-per-page-options="itemsPerPageOptions"
      ></slot>
    </template>
  </v-data-iterator>
</template>

<script>
import Resource from "../../../mixins/resource";
import Search from "../../../mixins/search";
import FormFilter from "../../internal/FormFilter";
import isEmpty from "lodash/isEmpty";
import { mapState, mapActions } from "vuex";

/**
 * List data iterator component, perfect for list CRUD page as well as any resource browsing standalone component.
 * Allow resource paginating and filtering. Use current query string context for initial state by default.
 * The list layout on default slot is fully customizable and can be used for separate `VaDataTable` component.
 * @displayName VaDataIterator
 */
export default {
  mixins: [Resource, Search],
  components: {
    FormFilter,
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
     * VaDataIterator manage only pagination here.
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
    disableExport: Boolean,
    /**
     * Disable create redirection. Will force create button to show.
     */
    disableCreateRedirect: Boolean,
    /**
     * Disable the global search.
     */
    disableGlobalSearch: Boolean,
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
    filter: {
      handler(newVal) {
        this.currentFilter = newVal || {};
      },
      immediate: true,
      deep: true,
    },
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

      /**
       * Triggered on pagination change
       */
      this.$emit("update:options", val);
    },
    currentFilter(newVal) {
      this.fetchData();
      this.updateQuery();

      this.$emit("update:filter", newVal);
    },
  },
  methods: {
    ...mapActions({
      update: "api/update",
    }),
    onSelect(selected) {
      /**
       * Triggered when item is selected.
       * Synchronize it with VaDataTable for selection clearing.
       */
      this.$emit("input", selected);
    },
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
        filter: this.currentFilter,
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
    onAction(action) {
      if (!this.disableCreateRedirect) {
        return;
      }

      let title = this.$t(`resources.${this.resource}.titles.create`);

      /**
       * Allows you to use global action event for custom action on your side.
       */
      this.$emit("action", { action, title });
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

      /**
       * Triggered on successful association of resource item.
       */
      this.$emit("associated", this.associationId);
      this.associationId = null;
    },
  },
};
</script>
