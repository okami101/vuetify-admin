export default {
  props: {
    resource: {
      type: String,
      default() {
        return this.$route.meta.resource;
      }
    }
  }
};
