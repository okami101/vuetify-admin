<template>
  <v-btn @click="onExport">Export</v-btn>
</template>

<script>
import Papa from "papaparse";

export default {
  name: "Export",
  methods: {
    async onExport() {
      /**
       * Generate CSV string from JSON api
       */
      const resourceName = this.$route.meta.resourceName;

      const csv = Papa.unparse(
        await this.$store.dispatch(`${resourceName}/getList`),
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
      const blob = new Blob([csv], { type: "text/csv" });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // Manage IE11+ & Edge
        window.navigator.msSaveOrOpenBlob(blob, `${resourceName}.csv`);
        return;
      }

      const fakeLink = document.createElement("a");
      fakeLink.style.display = "none";
      document.body.appendChild(fakeLink);

      fakeLink.setAttribute("href", URL.createObjectURL(blob));
      fakeLink.setAttribute("download", `${resourceName}.csv`);
      fakeLink.click();
    }
  }
};
</script>
