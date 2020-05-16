export default {
  props: {
    resource: {
      type: String,
      default() {
        return this.$route.meta.resource;
      },
    },
    translatable: {
      type: Boolean,
      default() {
        return this.$route.meta.translatable;
      },
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
