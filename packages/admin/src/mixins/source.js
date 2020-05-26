import Resource from "./resource";

/**
 * For components that must use specific property of the resource.
 */
export default {
  mixins: [Resource],
  props: {
    /**
     * Property of resource for fetching the value to show.
     * Support dot notation for nested object.
     */
    source: String,
  },
};
