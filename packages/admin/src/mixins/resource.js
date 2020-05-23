/**
 * For any resource related components.
 * @displayName VaMixinResource
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
  },
  methods: {
    hasAction(action) {
      /**
       * Check if access with user permissions for this specific action
       */
      let resource = this.$admin.getResource(this.resource);
      return resource.canAction(action);
    },
  },
};
