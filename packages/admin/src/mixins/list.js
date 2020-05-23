import Resource from "./resource";

/**
 * For components that must compute with list of resource items, as `VaDataTable`.
 * @displayName VaMixinList
 */
export default {
  mixins: [Resource],
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
