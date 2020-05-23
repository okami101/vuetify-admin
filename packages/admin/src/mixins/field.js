import Source from "./source";
import Item from "./item";
import get from "lodash/get";

/**
 * Main field mixin for all fields used for data show.
 * Can auto fetch property source value from the current resource.
 * Use it to create your own field component.
 * @displayName VaMixinField
 */
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
