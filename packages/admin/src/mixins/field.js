import Source from "./source";
import Item from "./item";
import get from "lodash/get";

export default {
  mixins: [Source, Item],
  computed: {
    value() {
      return typeof this.record === "string" || !this.source
        ? this.record
        : get(this.record, this.source);
    },
  },
};
