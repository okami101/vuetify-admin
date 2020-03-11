import Resource from "vuetify-admin/mixins/resource";
export default {
  mixins: [Resource],
  props: {
    item: {
      type: [String, Object],
      default: () => {}
    }
  },
  computed: {
    record() {
      return this.item || this.$store.state[this.resource].item;
    }
  }
};
