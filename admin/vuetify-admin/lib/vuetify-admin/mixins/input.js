import Item from "vuetify-admin/mixins/item";
import { mapState, mapMutations } from "vuex";

export default {
  mixins: [Item],
  props: {
    source: String,
    label: {
      type: [Boolean, String],
      default: undefined
    },
    hint: String,
    icon: String,
    hideDetails: Boolean,
    dense: Boolean,
    required: Boolean,
    alwaysOn: Boolean,
    filter: Boolean,
    edit: Boolean,
    value: {
      default: null
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
      errors: state => state.form.errors
    }),
    getLabel() {
      return this.label === undefined
        ? this.$t(`attributes.${this.source}`)
        : "";
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
        if (this.filter) {
          return;
        }
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
      updateForm: "form/update"
    }),
    initializeInput() {
      let { source } = this.$route.query;

      if (source) {
        this.input = JSON.parse(source)[this.source];
      }
    },
    updateValue() {
      /**
       * Update model in the store if input inside a form (i.e. no filter or editable input)
       */
      if (!this.filter || !this.edit) {
        this.updateForm({
          source: this.source,
          value: this.input
        });
      }
    },
    change(val) {
      this.$emit("change", val);
    }
  }
};
