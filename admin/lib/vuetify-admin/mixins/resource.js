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
      return this.$route.meta.actions.includes(action);
    },
  },
};
