import { mapState, mapMutations } from "vuex";

export default {
  props: {
    source: String,
    label: String,
    alwaysOn: Boolean,
    hint: String,
    required: Boolean,
    filter: Boolean,
    value: [String, Number, Object, Array, Boolean],
    rules: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      input: this.value,
      errorMessages: []
    };
  },
  computed: {
    ...mapState({
      record: state => state.api.resource || {},
      errors: state => state.form.errors
    }),
    getLabel() {
      return this.label || this.$t(`attributes.${this.source}`);
    },
    getRules() {
      let rules = [];

      if (this.required) {
        rules.push(
          v =>
            !!v || this.$t("va.forms.required_field", { field: this.getLabel })
        );
      }
      return rules;
    }
  },
  created() {
    this.updateValue();
  },
  watch: {
    record: {
      handler(val) {
        if (!this.filter) {
          this.input = val[this.source];
        }
      },
      immediate: true
    },
    input: {
      handler(val) {
        this.updateValue();
        this.$emit("input", val);
      }
    },
    errors(val) {
      this.errorMessages = val[this.source] || [];
    }
  },
  methods: {
    ...mapMutations({
      update: "form/update"
    }),
    updateValue() {
      if (!this.filter) {
        this.update({ source: this.source, value: this.input });
      }
    }
  }
};
