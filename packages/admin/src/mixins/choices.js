export default {
  props: {
    optionText: {
      type: [String, Array, Function],
      default: "name",
    },
    optionValue: {
      type: [String, Array, Function],
      default: "id",
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
            id: key,
            name: enums[key],
          };
        });
      },
    },
  },
};
