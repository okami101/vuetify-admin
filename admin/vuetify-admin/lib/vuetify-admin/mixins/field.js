import RoutedResourceProps from "vuetify-admin/mixins/routedResourceProps";

export default {
  mixins: [RoutedResourceProps],
  props: {
    source: String,
    label: String,
    addLabel: {
      type: Boolean,
      default: true
    }
  }
};
