import Resource from "./resource";

export default {
  mixins: [Resource],
  props: {
    /**
     * Specific case of parent resource for array input.
     */
    parentSource: String,
    /**
     * Property of resource for fetching the value to show.
     */
    source: String,
    /**
     * Override default label behavior.
     * Default is to get the localized VueI18n label from both ressource and property source.
     */
    label: {
      type: String,
      default() {
        if (!this.source) {
          return "";
        }

        let base = `resources.${this.resource}.fields`;

        if (this.parentSource) {
          return this.$t(`${base}.${this.parentSource}.${this.source}`);
        }
        return this.$t(`${base}.${this.source}`);
      },
    },
  },
};
