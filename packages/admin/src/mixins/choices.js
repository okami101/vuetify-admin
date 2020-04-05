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
    enum: Boolean,
    choices: {
      type: Array,
      default() {
        if (!this.enum) {
          return [];
        }

        let enums = this.$t(`resources.${this.resource}.enums.${this.source}`);

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
