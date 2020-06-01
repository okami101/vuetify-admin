/**
 * For any resource related components.
 */
export default {
  props: {
    /**
     * Name of the resource to use.
     * Required for good localized labelization and context action activators.
     * Default behavior is to fetch it from router context.
     */
    resource: {
      type: String,
      default() {
        return this.$route.meta.resource;
      },
    },
  },
  computed: {
    translatable() {
      return this.$route.meta.translatable;
    },
    currentResource() {
      return this.$admin.getResource(this.resource);
    },
  },
  methods: {
    hasAction(action) {
      /**
       * Check if access with user permissions for this specific action
       */
      return this.currentResource.canAction(action);
    },
  },
};
