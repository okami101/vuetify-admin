import Resource from "./resource";

/**
 * CRUD action page layout used for Show, Create end Edit.
 * @displayName VaMixinPage
 */
export default {
  mixins: [Resource],
  props: {
    /**
     * Optional H1 title of the page shown on the left of top header
     */
    title: String,
    /**
     * Exising record to use, default behavior is to fetch it from resource API store.
     */
    item: null,
  },
  computed: {
    record() {
      return this.item || this.$store.state[this.resource].item;
    },
  },
};
