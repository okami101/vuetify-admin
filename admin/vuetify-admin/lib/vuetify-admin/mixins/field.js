import { mapGetters } from "vuex";

export default {
  props: {
    source: String,
    label: String,
    item: {
      type: Object,
      default: () => {}
    },
    addLabel: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters({
      routeItem: "api/item"
    }),
    record() {
      return this.item || this.routeItem(this.$route.meta.resource) || {};
    }
  }
};
