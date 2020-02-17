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
    },
    sortable: {
      type: Boolean,
      default: true
    },
    textAlign: {
      type: String,
      default: "left"
    }
  }
};
