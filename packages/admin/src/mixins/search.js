import { mapActions } from "vuex";

/**
 * Common props for resource search components, as `VaList` or `VaAutocompleteInput`.
 * Use the `getList` data provider uner the hood.
 */
export default {
  props: {
    /**
     * Internal active filter.
     * Sent to your data provider inside `filter` params.
     */
    filter: {
      type: Object,
      default: () => {},
    },
    /**
     * List of fields to select for API side. Support dot notation for nested fields.
     * Sent to your data provider inside `fields` params.
     */
    fields: {
      type: Array,
      default: () => [],
    },
    /**
     * List of sorted fields, can be multiple.
     * Sent to your data provider inside `sort` params.
     */
    sortBy: {
      type: Array,
      default: () => [],
    },
    /**
     * List of sort state for each sorted fields, only `boolean`, `true` if sorted as `DESC`.
     * Sent to your data provider inside `sort` params.
     */
    sortDesc: {
      type: Array,
      default: () => [],
    },
    /**
     * Related resources to include within current resource for API side. Allow eager-loading on demand.
     * Sent to your data provider inside `include` params.
     */
    include: {
      type: [Array, Object],
      default: () => [],
    },
    /**
     * Maximum number of items to show in the list for each page.
     * Sent to your data provider inside `pagination.perPage` params.
     */
    itemsPerPage: {
      type: Number,
      default() {
        let value = 15;

        if (this.$admin.options.list) {
          return this.$admin.options.list.itemsPerPage || value;
        }
        return value;
      },
    },
    /**
     * Disable items per page on query, forced on server side.
     * Note at `itemsPerPage` is still necessary for proper client-side pager calculation.
     */
    disableItemsPerPage: {
      type: Boolean,
      default() {
        if (this.$admin.options.list) {
          return this.$admin.options.list.disableItemsPerPage || false;
        }
        return false;
      },
    },
  },
  methods: {
    ...mapActions({
      getList: "api/getList",
      getMany: "api/getMany",
    }),
  },
};
