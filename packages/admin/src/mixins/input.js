import Item from "../mixins/item";
import get from "lodash/get";
import { mapActions } from "vuex";

export default {
  mixins: [Item],
  inject: {
    formState: { default: undefined },
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
      },
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
      default: null,
    },
  },
  data() {
    return {
      input: null,
      errorMessages: [],
    };
  },
  watch: {
    value: {
      handler(val) {
        this.input = val;
      },
      immediate: true,
    },
    formState: {
      handler(val) {
        if (val) {
          /**
           * Initialize value & errors
           */
          this.update(get(val.item || val.model, this.uniqueFormId));

          if (val.errors) {
            this.errorMessages = val.errors[this.uniqueFormId] || [];
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    uniqueFormId() {
      return [this.parentSource, this.index, this.model || this.source]
        .filter((s) => s !== undefined)
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
        clearable: this.clearable,
      };
    },
    rules() {
      let rules = [];

      if (this.required) {
        rules.push(
          (v) =>
            !!v || this.$t("va.forms.required_field", { field: this.label })
        );
      }
      return rules;
    },
  },
  methods: {
    ...mapActions({
      updateItem: "api/update",
    }),
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
              [this.uniqueFormId]: value,
            },
          },
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
      if (this.formState) {
        this.formState.update({
          source: this.uniqueFormId,
          value,
        });
      }

      this.input = value;
      this.$emit("input", value);
    },
  },
};
