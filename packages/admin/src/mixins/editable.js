import { mapActions } from "vuex";

export default {
  props: {
    /**
     * Mark this field as live-editable.
     * If enabled, the input will send directly a call to the API for live edit on change.
     * Ideal for editable input inside VaDatagrid, with combination of `editable` prop for each column.
     */
    editable: Boolean,
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
  },
};
