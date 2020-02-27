import Item from "vuetify-admin/mixins/item";
import get from "lodash/get";

export default {
  mixins: [Item],
  props: {
    source: String,
    label: {
      type: String,
      default() {
        return this.source
          ? this.$t(`resources.${this.resource}.fields.${this.source}`)
          : "";
      }
    },
    inline: Boolean,
    addLabel: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    value() {
      return typeof this.record === "string"
        ? this.record
        : get(this.record, this.source);
    }
  }
};
