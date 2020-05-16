export default {
  props: {
    itemText: {
      type: [String, Array, Function],
      default: "text",
    },
    itemValue: {
      type: [String, Array, Function],
      default: "value",
    },
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
