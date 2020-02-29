import Resource from "vuetify-admin/mixins/resource";

export default {
  mixins: [Resource],
  props: {
    items: {
      type: Array,
      default() {
        return this.$parent.items;
      }
    }
  }
};
