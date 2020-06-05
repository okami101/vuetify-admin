/**
 * For components that must compute with list of resource items, as `VaDataTable`.
 */
export default {
  props: {
    /**
     * List of data resource object to show inside list component.
     * Used by VaDataTable
     */
    items: {
      type: Array,
      default: () => [],
    },
  },
};
