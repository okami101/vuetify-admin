import Item from "@/mixins/item";
import get from "lodash/get";

export default {
  mixins: [Item],
  props: {
    source: String,
  },
  computed: {
    value() {
      return typeof this.record === "string"
        ? this.record
        : get(this.record, this.source);
    },
  },
};
