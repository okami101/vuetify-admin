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
            :to="`/${$route.meta.resourceName}/create`"
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
        'items-per-page-options': rowsPerPage
      }"
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
    }
  },
  data() {
    return {
      search: null,
      items: []
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
    }
  },
  async mounted() {
    let { data } = await this.getList();
    this.items = data;
  },
  methods: {
    ...mapActions({
      getList: "api/getList"
    }),
    onSearch: debounce(function() {
      console.log(this.search);
    }, 200)
  }
};
</script>
