import { mapState, mapMutations } from "vuex";

export default {
  props: {
    source: String,
    label: String,
    alwaysOn: Boolean,
    hint: String,
    required: Boolean,
    filter: Boolean,
    value: {
      default: null
    },
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
      record: state => state.api.resource,
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
    this.initializeInput();
    this.updateValue();
  },
  watch: {
    value: {
      handler(val) {
        this.input = val;
      },
      immediate: true
    },
    record: {
      handler(val) {
        if (val && this.source) {
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
    initializeInput() {
      let { source } = this.$route.query;

      if (source) {
        this.input = JSON.parse(source)[this.source];
      }
    },
    updateValue() {
      if (!this.filter) {
        this.update({
          source: this.source,
          value: this.input
        });
      }
    }
  }
};
