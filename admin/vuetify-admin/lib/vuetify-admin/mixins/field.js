import Item from "vuetify-admin/mixins/item";

export default {
  mixins: [Item],
  props: {
    source: String,
    label: {
      type: [Boolean, String],
      default: undefined
    },
    addLabel: {
      type: Boolean,
      default: true
    }
  }
};
