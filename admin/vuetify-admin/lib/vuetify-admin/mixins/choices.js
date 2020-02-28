export default {
  props: {
    optionText: {
      type: [String, Array, Function],
      default: "name"
    },
    optionValue: {
      type: [String, Array, Function],
      default: "id"
    },
    choices: {
      type: Array,
      default() {
        let enums = this.$t(`resources.${this.resource}.enums.${this.source}`);

        return Object.keys(enums).map(key => {
          return {
            id: key,
            name: enums[key]
          };
        });
      }
    }
  }
};
