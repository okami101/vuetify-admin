<template>
  <div>
    <va-aside-content>
      <slot
        name="aside"
        :resource="resource"
        v-bind="{ items, total, selected: value }"
      ></slot>
    </va-aside-content>
    <v-data-iterator
      :items="items"
      :server-items-length="total"
      :loading="loading"
      :options.sync="currentOptions"
      :value="value"
      :items-per-page="itemsPerPage"
      :footer-props="{
        'items-per-page-options': rowsPerPage,
        showFirstLastPage: true
      }"
      @input="selected => $emit('input', selected)"
    >
      <template v-slot:header>
        <v-card :flat="flat">
          <v-toolbar flat color="blue lighten-5" v-if="value.length">
            {{ $tc("va.datagrid.selected_items", value.length) }}
            <v-spacer></v-spacer>
            <div>
              <va-delete-button
                :resource="resource"
                @delete="onBlukDelete"
              ></va-delete-button>
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
import Page from "vuetify-admin/mixins/page";
import Resource from "vuetify-admin/mixins/resource";
import Search from "vuetify-admin/mixins/search";
import isEmpty from "lodash/isEmpty";
import FormFilter from "../List/FormFilter";
import { mapState, mapMutations, mapActions } from "vuex";
import EventBus from "vuetify-admin/utils/eventBus";

export default {
  name: "List",
  mixins: [Page, Resource, Search],
  components: {
    FormFilter
  },
  props: {
    /**
     * Internal filter
     */
    filter: {
      type: Object,
      default: () => {}
    },
    /**
     * Exposed filters
     */
    filters: {
      type: Array,
      default: () => []
    },
    /**
     * References to fetch
     */
    references: {
      type: Array,
      default: () => []
    },
    flat: Boolean,
    rowsPerPage: {
      type: Array,
      default: () => [5, 10, 15, 25, 50, 100]
    },
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {}
    },
    exporter: {
      type: Boolean,
      default: true
    },
    useQueryString: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loaded: false,
      loading: false,
      items: [],
      total: 0,
      currentOptions: {},
      currentFilter: {},
      enabledFilters: []
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
        .map(f => {
          if (f === "q") {
            return {
              source: "q",
              label: this.$t("va.datagrid.search"),
              alwaysOn: true,
              options: { icon: "mdi-magnify" }
            };
          }
          return f;
        })
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
            label:
              f.label ||
              this.$t(`resources.${this.resource}.fields.${f.source}`)
          };
        });
    },
    getEnabledFilters() {
      return this.getFilters.filter(f => {
        return f.alwaysOn || this.enabledFilters.includes(f.source);
      });
    },
    getDisabledFilters() {
      return this.getFilters.filter(f => {
        return !f.alwaysOn && !this.enabledFilters.includes(f.source);
      });
    }
  },
  watch: {
    options: {
      handler(val) {
        this.currentOptions = val;
      },
      immediate: true
    },
    currentOptions(val) {
      this.fetchData();
      this.updateQuery();
      this.$emit("update:options", val);
    },
    currentFilter() {
      this.fetchData();
      this.updateQuery();
    }
  },
  methods: {
    ...mapMutations({
      setReferenceData: "api/setReferenceData"
    }),
    ...mapActions({
      updateMany: "api/updateMany",
      deleteMany: "api/deleteMany"
    }),
    async initFiltersFromQuery() {
      if (!this.useQueryString) {
        return;
      }

      /**
       * Apply current route query into options
       */
      const { perPage, page, sortBy, sortDesc, filter } = this.$route.query;

      this.currentOptions = {
        page: page ? parseInt(page, 10) : 1,
        itemsPerPage: perPage ? parseInt(perPage, 10) : this.itemsPerPage,
        sortBy: sortBy ? sortBy.split(",") : [],
        sortDesc: sortDesc
          ? sortDesc.split(",").map(bool => bool === "true")
          : []
      };

      /**
       * Enable active filters from query
       */
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
      if (!this.useQueryString || isEmpty(this.currentOptions)) {
        return;
      }

      /**
       * Update query router
       */
      let { itemsPerPage, page, sortBy, sortDesc } = this.currentOptions;
      this.$router
        .push({
          query: {
            perPage: itemsPerPage,
            page,
            sortBy: (sortBy || []).join(","),
            sortDesc: (sortDesc || []).join(","),
            filter: JSON.stringify(this.currentFilter)
          }
        })
        .catch(e => {});
    },
    async fetchData() {
      if (!this.loaded || isEmpty(this.currentOptions)) {
        return;
      }

      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.currentOptions;

      /**
       * Load paginated and sortad data list
       */
      let { data, total } = await this.getList({
        resource: this.resource,
        params: {
          fields: {
            [this.resource]: this.fields
          },
          include: this.include,
          pagination: {
            page,
            perPage: itemsPerPage
          },
          sort: (sortBy || []).map((by, index) => {
            return { by, desc: sortDesc[index] };
          }),
          filter: {
            ...this.filter,
            ...this.currentFilter
          }
        }
      });

      /**
       * Async references preloading
       */
      this.references.map(r => {
        this.loadReferences(
          data.map(d => d[r.source]),
          r
        );
      });

      this.loading = false;
      this.items = data;
      this.total = total;
    },
    async loadReferences(ids, { name, fields, include, multiple, syncKey }) {
      /**
       * Preload keyed reference data resources
       */
      let { data } = await this.getMany({
        resource: name,
        params: {
          fields: {
            [name]: fields
          },
          include,
          ids: [...new Set(multiple ? [].concat(...ids) : ids)]
        }
      });
      this.setReferenceData({
        key: syncKey,
        data
      });
    },
    async onDelete(item) {
      this.fetchData();
    },
    async onBlukDelete() {
      if (
        await this.$confirm(
          this.$t("va.confirm.delete_many_title", {
            resource: this.$tc(
              `resources.${this.resource}.name`,
              this.value.length
            ).toLowerCase(),
            count: this.value.length
          }),
          this.$t("va.confirm.delete_many_message", {
            resource: this.$tc(
              `resources.${this.resource}.name`,
              this.value.length
            ).toLowerCase(),
            count: this.value.length
          })
        )
      ) {
        await this.deleteMany({
          resource: this.resource,
          params: { ids: this.value.map(({ id }) => id) }
        });
        this.$emit("input", []);
        this.fetchData();
      }
    }
  }
};
</script>
