/**
 * Common props for all choices based fields or inputs.
 */
export default {
  props: {
    /**
     * Attribute for showing text.
     */
    itemText: {
      type: [String, Array, Function],
      default: "text",
    },
    /**
     * Attribute where taking the value from.
     */
    itemValue: {
      type: [String, Array, Function],
      default: "value",
    },
    /**
     * List of choices for select.
     * Takes localized enums from your VueI18n resources locales by default.
     */
    choices: {
      type: Array,
      default() {
        let enumKey = `resources.${this.resource}.enums.${this.source}`;
        if (!this.$te(enumKey)) {
          return [];
        }

        let enums = this.$t(enumKey);

        return Object.keys(enums).map((key) => {
          return {
            value: key,
            text: enums[key],
          };
        });
      },
    },
  },
};
