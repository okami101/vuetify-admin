<template>
  <v-btn text @click="onExport" color="primary">
    <v-icon small class="mr-2">mdi-download</v-icon>
    {{ $t("va.actions.export") }}
  </v-btn>
</template>

<script>
import Papa from "papaparse";
import { mapActions } from "vuex";

export default {
  name: "ExportButton",
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    filter: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapActions({
      getList: "api/getList"
    }),
    async onExport() {
      /**
       * Generate CSV string from JSON api
       */
      const { sortBy, sortDesc } = this.options;

      let { data } = await this.getList({
        sort: sortBy.map((by, index) => {
          return { by, desc: sortDesc[index] };
        }),
        filter: this.filter
      });

      const csv = Papa.unparse(
        data.map(item => {
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
          columns: null //or array of strings
        }
      );

      /**
       * Magic download
       */
      const fileName = this.$store.state.api.resourceName;
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
    }
  }
};
</script>
