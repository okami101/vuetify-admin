import EventBus from "vuetify-admin/utils/eventBus";
import Item from "vuetify-admin/mixins/item";
import get from "lodash/get";
import { mapActions } from "vuex";

export default {
  mixins: [Item],
  inject: {
    formName: { default: undefined },
    formItem: { default: undefined }
  },
  props: {
    parentSource: String,
    source: String,
    index: Number,
    model: String,
    label: {
      type: String,
      default() {
        let base = `resources.${this.resource}.fields`;

        if (this.parentSource) {
          return this.$t(`${base}.${this.parentSource}.${this.source}`);
        }
        return this.$t(`${base}.${this.source}`);
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
    filterable: Boolean,
    editable: Boolean,
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
  created() {
    /**
     * Initiate parent model form
     */
    this.initializeValue();

    EventBus.$on("form-errors", ({ name, errors }) => {
      if (name === this.formName) {
        this.errorMessages = errors[this.uniqueFormId] || [];
      }
    });
  },
  beforeDestroy() {
    EventBus.$off("form-errors");
  },
  watch: {
    value: {
      handler(val) {
        this.input = val;
      },
      immediate: true
    }
  },
  computed: {
    getModelProp() {
      /**
       * Get original prop source for value
       * If specific model prop is not set, take required source prop as default
       */
      return this.model || this.source;
    },
    hasItem() {
      return !!(this.formItem || this.record);
    },
    getValue() {
      return get(this.formItem || this.record, this.getModelProp);
    },
    uniqueFormId() {
      return [this.parentSource, this.index, this.getModelProp]
        .filter(s => s !== undefined)
        .join(".");
    },
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
  methods: {
    ...mapActions({
      updateItem: "api/update"
    }),
    initializeValue() {
      if (this.hasItem) {
        /**
         * Initialize from context
         */
        return this.updateForm(this.getValue);
      }

      /**
       * Initialize from query
       */
      let { source } = this.$route.query;

      if (source) {
        this.update(JSON.parse(source)[this.source]);
      }
    },
    /**
     * Interaction event
     */
    change(value) {
      this.$emit("change", value);

      if (this.editable) {
        /**
         * Quick update model on server
         */
        this.updateItem({
          resource: this.resource,
          params: {
            id: this.item.id,
            data: {
              [this.getModelProp]: value
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
       * Update model in the injected form if available
       */
      if (this.formName) {
        return this.updateForm(value);
      }

      if (this.filterable) {
        EventBus.$emit("filter", {
          source: this.getModelProp,
          value
        });

        this.input = value;
        this.$emit("input", value);
      }
    },
    updateForm(value) {
      EventBus.$emit("update-model", {
        name: this.formName,
        source: this.uniqueFormId,
        value
      });

      this.input = value;
      this.$emit("input", value);
    }
  }
};
