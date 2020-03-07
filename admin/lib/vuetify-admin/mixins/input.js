import Item from "vuetify-admin/mixins/item";
import EventBus from "vuetify-admin/utils/eventBus";
import get from "lodash/get";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  mixins: [Item],
  props: {
    source: String,
    model: String,
    label: {
      type: String,
      default() {
        return this.$t(`resources.${this.resource}.fields.${this.source}`);
      }
    },
    hint: String,
    icon: String,
    hideDetails: Boolean,
    dense: Boolean,
    placeholder: String,
    clearable: Boolean,
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
    commonProps() {
      return {
        label: this.label,
        value: this.input,
        hint: this.hint,
        rules: this.rules,
        errorMessages: this.errorMessages,
        hideDetails: this.hideDetails,
        dense: this.dense,
        placeholder: this.placeholder,
        clearable: this.clearable
      };
    },
    rules() {
      let rules = [];

      if (this.required) {
        rules.push(
          v => !!v || this.$t("va.forms.required_field", { field: this.label })
        );
      }
      return rules;
    }
  },
  created() {
    this.initializeFromQuery();
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
          this.update(get(val, this.model || this.source) || this.value);
        }
      },
      immediate: true
    },
    errors(val) {
      this.errorMessages = val[this.model || this.source] || [];
    }
  },
  methods: {
    ...mapMutations({
      updateForm: "form/update"
    }),
    ...mapActions({
      updateItem: "api/update"
    }),
    initializeFromQuery() {
      let { source } = this.$route.query;

      if (source) {
        this.update(JSON.parse(source)[this.source]);
      }
    },
    change(value) {
      this.$emit("change", value);

      if (this.edit) {
        /**
         * Quick update model on server
         */
        this.updateItem({
          resource: this.resource,
          params: {
            id: this.item.id,
            data: {
              [this.source]: value
            }
          }
        });
      }
    },
    /**
     * Input event
     */
    update(value) {
      /**
       * Update model in the store if input inside a form (i.e. no filter or editable input)
       */
      if (!this.filter || !this.edit) {
        this.updateForm({
          source: this.model || this.source,
          value
        });
      }

      if (this.filter) {
        EventBus.$emit("filter", {
          source: this.source,
          value
        });
      }

      this.input = value;
      this.$emit("input", value);
    }
  }
};
