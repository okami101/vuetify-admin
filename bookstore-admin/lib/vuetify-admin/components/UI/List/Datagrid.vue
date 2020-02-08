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
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-row>
          <v-col sm="auto">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              dense
              v-if="canSearch"
              @input="onSearch"
            ></v-text-field>
          </v-col>
          <v-col class="d-flex">
            <v-spacer></v-spacer>
            <v-btn
              text
              :to="`/${$route.meta.resource}/create`"
              color="primary"
              v-if="canCreate"
            >
              <v-icon>mdi-plus</v-icon>
              Create
            </v-btn>
            <export
              text
              v-if="canExport"
              :options="options"
              :filter="filter"
            ></export>
          </v-col>
        </v-row>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn
        text
        :to="`/${$route.meta.resource}/${item.id}`"
        @click="showItem(item)"
        color="primary"
      >
        <v-icon small class="mr-2">
          mdi-eye
        </v-icon>
        Show
      </v-btn>
      <v-btn text :to="`/${$route.meta.resource}/${item.id}/edit`" color="blue">
        <v-icon small class="mr-2">
          mdi-pencil
        </v-icon>
        Edit
      </v-btn>
      <v-btn text @click="deleteItem(item)" color="red">
        <v-icon small>
          mdi-trash-can
        </v-icon>
        Delete
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import Export from "./Export";
import debounce from "lodash/debounce";
import { mapActions } from "vuex";

export default {
  name: "Datagrid",
  components: {
    Export
  },
  props: {
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
    },
    hasRowActions: {
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
      options: {}
    };
  },
  computed: {
    headers() {
      let headers = this.$slots.default.map(item => {
        let {
          source,
          label,
          sortable,
          align
        } = item.componentOptions.propsData;

        return {
          text: label,
          align,
          sortable: sortable || sortable === "",
          value: source,
          source
        };
      });

      if (this.hasRowActions) {
        headers.push({ value: "action", sortable: false });
      }
      return headers;
    },
    fields() {
      return this.headers.filter(item => item.source).map(item => item.source);
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
  async mounted() {
    this.loadData();
  },
  methods: {
    ...mapActions({
      getList: "api/getList"
    }),
    async loadData() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;

      let { data, total } = await this.getList({
        fields: this.fields,
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
    }, 200),
    showItem(item) {},
    editItem(item) {},
    deleteItem(item) {}
  }
};
</script>
