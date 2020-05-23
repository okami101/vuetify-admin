<template>
  <va-action-button
    :hide-label="hideLabel"
    :label="label"
    :icon="icon"
    :text="text"
    :color="color || 'primary'"
    @click="onBlukUpdate"
  ></va-action-button>
</template>

<script>
import Resource from "../../../mixins/resource";
import ActionButton from "../../../mixins/action-button";
import { mapActions } from "vuex";

/**
 * Generic customizable button for update bulk actions in VaDataIterator component.
 * Shown after items selections. Use `updateMany` data provider method under the hood.
 * @displayName VaBulkActionButton
 */
export default {
  mixins: [Resource, ActionButton],
  props: {
    /**
     * Selected resources items.
     */
    value: Array,
    /**
     * Data object to send on `updateMany` data provider method.
     * Contains the resource properties to update.
     */
    action: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      updateMany: "api/updateMany",
      refresh: "api/refresh",
    }),
    async onBlukUpdate() {
      await this.updateMany({
        resource: this.resource,
        params: { ids: this.value.map(({ id }) => id), data: this.action },
      });

      /**
       * Cleanup selected elements
       */
      this.$emit("input", []);
      this.refresh(this.resource);
    },
  },
};
</script>
