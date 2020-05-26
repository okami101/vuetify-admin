import Source from "./source";
import get from "lodash/get";

/**
 * Main field mixin for all fields used for data show.
 * Can auto fetch property source value from the current resource.
 * Use it to create your own field component.
 */
export default {
  mixins: [Source],
  inject: {
    showState: { default: undefined },
  },
  props: {
    /**
     * Override default item injected by `VaShow`.
     */
    item: null,
  },
  computed: {
    record() {
      return this.item || (this.showState ? this.showState.item : null);
    },
    value() {
      return typeof this.record === "string" || !this.source
        ? this.record
        : get(this.record, this.source);
    },
  },
};
