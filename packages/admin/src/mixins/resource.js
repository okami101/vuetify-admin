import isEmpty from "lodash/isEmpty";

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
  computed: {
    resourceInfos() {
      return this.$admin.resources.find((r) => r.name === this.resource);
    },
  },
  methods: {
    hasAction(action) {
      if (!this.resourceInfos.actions.includes(action)) {
        return false;
      }

      /**
       * If no permissions setted, return OK for access
       */
      if (isEmpty(this.resourceInfos.permissions)) {
        return true;
      }

      /**
       * Check if access with user permissions for this specific action
       */
      let permissions = this.resourceInfos.getPermissions(action);
      return this.$admin.can(permissions);
    },
  },
};
