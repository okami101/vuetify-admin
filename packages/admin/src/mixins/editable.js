/**
 * Allow any input to have editable behavior.
 */
export default {
  props: {
    /**
     * Full item resource to be editable.
     */
    item: null,
    /**
     * Mark this field as live-editable.
     * If enabled, the input will send directly a call to the API for live edit on change.
     * Ideal for editable input inside VaDataTable, with combination of `editable` prop for each column.
     */
    editable: Boolean,
  },
  methods: {
    /**
     * Interaction event
     */
    change(value) {
      /**
       * Triggered on any user input interaction.
       */
      this.$emit("change", value);

      if (this.editable) {
        /**
         * Quick update model on server
         */
        this.$store.dispatch(`${this.resource}/update`, {
          id: this.item.id,
          data: {
            [this.uniqueFormId]: value,
          },
        });
      }
    },
  },
};
