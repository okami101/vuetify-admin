export default {
  computed: {
    enums() {
      let enums = this.$t(`resources.${this.resource}.enums.${this.source}`);

      return Object.keys(enums).map(key => {
        return {
          value: key,
          text: enums[key]
        };
      });
    }
  },
  methods: {
    getLabel(value) {
      return value
        ? this.$t(`resources.${this.resource}.enums.${this.source}.${value}`)
        : "";
    }
  }
};
