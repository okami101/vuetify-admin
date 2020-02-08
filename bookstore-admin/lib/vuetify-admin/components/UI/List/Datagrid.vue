<template>
  <v-card>
    <v-card-title>
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
          <export text v-if="canExport"></export>
        </v-col>
      </v-row>
    </v-card-title>
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
    ></v-data-table>
  </v-card>
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
      return this.$slots.default.map(item => {
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
          value: source
        };
      });
    },
    fields() {
      return this.headers.filter(item => item.value).map(item => item.value);
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
      let filter = {};

      if (this.search) {
        filter.search = this.search;
      }

      let { data, total } = await this.getList({
        fields: this.fields,
        pagination: {
          page,
          perPage: itemsPerPage
        },
        sort: sortBy.map((by, index) => {
          return { by, desc: sortDesc[index] };
        }),
        filter
      });

      this.loading = false;
      this.items = data;
      this.total = total;
    },
    onSearch: debounce(function() {
      this.loadData();
    }, 200)
  }
};
</script>
