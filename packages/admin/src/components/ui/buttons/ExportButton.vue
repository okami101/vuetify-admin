<template>
  <va-action-button
    v-if="hasAction('list')"
    :hide-label="icon"
    :label="$t('va.actions.export')"
    icon="mdi-download"
    :color="color || 'success'"
    text
    @click="onExport"
  ></va-action-button>
</template>

<script>
import Resource from "../../../mixins/resource";
import Button from "../../../mixins/button";
import Papa from "papaparse";

/**
 * Action button for export all data from a list iterator, aka VaList.
 * Use current state of VaList, i.e. keep current filters and sorts while removing pagination limitation.
 * Will provoke a download of a CSV file generated on client side thanks to papaparse library.
 */
export default {
  mixins: [Resource, Button],
  props: {
    /**
     * Current state of list, with mainly current sorting.
     */
    options: {
      type: Object,
      default: () => {},
    },
    /**
     * Current filter state of the list.
     */
    filter: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
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

      let { data } = await this.$store.dispatch(
        `${this.resource}/getList`,
        params
      );

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
