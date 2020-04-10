<template>
  <v-tooltip bottom :disabled="!icon" v-if="hasAction('list')">
    <template v-slot:activator="{ on }">
      <v-btn :icon="icon" text @click="onExport" :color="color" v-on="on">
        <v-icon small>mdi-download</v-icon>
        <span v-if="!icon" class="ml-2">
          {{ $t("va.actions.export") }}
        </span>
      </v-btn>
    </template>
    <span>{{ $t("va.actions.export") }}</span>
  </v-tooltip>
</template>

<script>
import Resource from "../../../mixins/resource";
import Papa from "papaparse";
import { mapActions } from "vuex";

export default {
  name: "ExportButton",
  mixins: [Resource],
  props: {
    icon: Boolean,
    color: {
      type: String,
      default: "success",
    },
    options: {
      type: Object,
      default: () => {},
    },
    filter: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    ...mapActions({
      getList: "api/getList",
    }),
    async onExport() {
      /**
       * Generate CSV string from JSON api
       */
      let params = {
        filter: this.filter,
      };

      if (this.options) {
        const { sortBy, sortDesc } = this.options;

        params.sort = sortBy.map((by, index) => {
          return { by, desc: sortDesc[index] };
        });
      }

      let { data } = await this.getList({
        resource: this.resource,
        params,
      });

      const csv = Papa.unparse(
        data.map((item) => {
          /**
           * Remove nested object which is not supported on Papa
           */
          for (let prop in item) {
            if (typeof item[prop] === "object") {
              delete item[prop];
            }
          }
          return item;
        }),
        {
          quotes: false, //or array of booleans
          quoteChar: '"',
          escapeChar: '"',
          delimiter: ",",
          header: true,
          newline: "\r\n",
          skipEmptyLines: false, //or 'greedy',
          columns: null, //or array of strings
        }
      );

      /**
       * Magic download
       */
      const fileName = this.resource;
      const blob = new Blob([csv], { type: "text/csv" });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // Manage IE11+ & Edge
        window.navigator.msSaveOrOpenBlob(blob, `${fileName}.csv`);
        return;
      }

      const fakeLink = document.createElement("a");
      fakeLink.style.display = "none";
      document.body.appendChild(fakeLink);

      fakeLink.setAttribute("href", URL.createObjectURL(blob));
      fakeLink.setAttribute("download", `${fileName}.csv`);
      fakeLink.click();
    },
  },
};
</script>
