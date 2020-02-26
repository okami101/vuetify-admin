import Item from "vuetify-admin/mixins/item";
import get from "lodash/get";

export default {
  mixins: [Item],
  props: {
    source: String,
    label: {
      type: String,
      default() {
        return this.$t(`resources.${this.resource}.fields.${this.source}`);
      }
    },
    addLabel: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    value() {
      return get(this.record, this.source);
    }
  }
};
