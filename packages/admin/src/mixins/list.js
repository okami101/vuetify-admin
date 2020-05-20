import Resource from "./resource";

export default {
  mixins: [Resource],
  props: {
    /**
     * List of data resource object to show inside list component.
     * Uses for VaDatagrid
     */
    items: {
      type: Array,
      default: () => [],
    },
  },
};
