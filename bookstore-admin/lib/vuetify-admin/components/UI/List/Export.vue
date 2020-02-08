<template>
  <v-btn text @click="onExport" color="primary">
    <v-icon>mdi-download</v-icon>
    Export
  </v-btn>
</template>

<script>
import Papa from "papaparse";
import { mapActions } from "vuex";

export default {
  name: "Export",
  methods: {
    ...mapActions({
      getList: "api/getList"
    }),
    async onExport() {
      /**
       * Generate CSV string from JSON api
       */
      let { data } = await this.getList();
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
      const fileName = this.$route.meta.resource;
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
