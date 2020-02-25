import Item from "vuetify-admin/mixins/item";

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
  }
};
