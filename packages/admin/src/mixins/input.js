import Source from "./source";
import InputWrapper from "./input-wrapper";
import get from "lodash/get";

/**
 * Main input mixin for all inputs used for resource property edition or creation.
 * Auto update the model of the parent form.
 * Use it to create your own input component.
 */
export default {
  mixins: [Source, InputWrapper],
  inject: {
    formState: { default: undefined },
  },
  props: {
    /**
     * By default, the source will be the final name that will be sent to the API for create/update.
     * This prop allows you to override this default behavior.
     */
    model: String,
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
        appendIcon: this.appendIcon,
        hint: this.hint,
        rules: this.rules,
        errorMessages: this.errorMessages,
        hideDetails: this.hideDetails,
        dense: this.dense,
        placeholder: this.placeholder,
        clearable: this.clearable,
      };
    },
  },
  methods: {
    change(value) {
      /**
       * Triggered on any user input interaction.
       */
      this.$emit("change", value);
    },
    update(value) {
      // Take default value if undefined
      value = value === undefined ? this.value : value;

      /**
       * Update model in the injected form if available.
       */
      if (this.formState) {
        this.formState.update({
          source: this.uniqueFormId,
          value: value,
        });
      }

      /**
       * Set value into input.
       */
      this.input = value;

      /**
       * Triggered if value updated.
       */
      this.$emit("input", value);
    },
  },
};
