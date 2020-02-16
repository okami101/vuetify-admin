import { mapState, mapMutations } from "vuex";

export default {
  props: {
    source: String,
    label: String,
    hint: String,
    required: Boolean,
    rules: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      input: null,
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
  watch: {
    record: {
      handler(val) {
        this.input = val[this.source];
      },
      immediate: true
    },
    input: {
      handler(value) {
        this.update({ source: this.source, value });
      },
      immediate: true
    },
    errors(val) {
      this.errorMessages = val[this.source] || [];
    }
  },
  methods: {
    ...mapMutations({
      update: "form/update"
    })
  }
};
