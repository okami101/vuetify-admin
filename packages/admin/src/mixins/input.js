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
      acceptValue: true,
      input: null,
      internalErrorMessages: [],
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
        if (val && this.acceptValue) {
          /**
           * Initialize value & errors
           */
          this.update(
            this.getItem(get(val.item || val.model, this.uniqueSourceId))
          );
        }
      },
      immediate: true,
    },
    "formState.item"(val) {
      /**
       * Only if item change, mainly for form in aside case (users).
       */
      if (this.acceptValue) {
        this.update(
          this.getItem(get(val || this.formState.model, this.uniqueSourceId))
        );
      }
    },
    "formState.errors"(val) {
      if (val) {
        this.internalErrorMessages = val[this.uniqueFormId] || [];
      }
    },
  },
  computed: {
    uniqueSourceId() {
      return [this.parentSource, this.index, this.source]
        .filter((s) => s !== undefined)
        .join(".");
    },
    uniqueFormId() {
      return [this.parentSource, this.index, this.model || this.source]
        .filter((s) => s !== undefined)
        .join(".");
    },
    commonProps() {
      return {
        label: this.getLabel,
        value: this.input,
        appendIcon: this.appendIcon,
        hint: this.hint,
        rules: this.rules,
        errorMessages: [...this.errorMessages, ...this.internalErrorMessages],
        hideDetails: this.hideDetails,
        dense: this.dense,
        placeholder: this.placeholder,
        clearable: this.clearable,
      };
    },
  },
  methods: {
    getItem(value) {
      return value === undefined ? this.value : value;
    },
    change(value) {
      /**
       * Triggered on any user input interaction.
       */
      this.$emit("change", value);
    },
    update(value) {
      /**
       * Update model in the injected form if available.
       */
      if (this.formState) {
        this.formState.update({
          source: this.uniqueFormId,
          value,
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
