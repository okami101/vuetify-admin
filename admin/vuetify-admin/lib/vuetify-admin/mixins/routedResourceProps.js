import { mapGetters } from "vuex";

export default {
  props: {
    resource: String,
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters({
      routeItem: "api/item"
    }),
    record() {
      return this.item || this.routeItem(this.$route.meta.resource) || {};
    },
    getResource() {
      return this.resource || this.$route.meta.resource;
    },
    isRouteResource() {
      return !this.resource && this.$route.meta.resource;
    }
  }
};
