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
  }
};
