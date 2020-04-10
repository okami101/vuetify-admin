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
      return this.resourceInfos.actions.includes(action);
    },
  },
};
