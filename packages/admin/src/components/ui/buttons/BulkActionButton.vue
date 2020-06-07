<template>
  <va-action-button
    :hide-label="hideLabel"
    :label="label"
    :icon="icon"
    :text="text"
    :color="color || 'primary'"
    @click="onBulkUpdate"
  ></va-action-button>
</template>

<script>
import ActionButton from "../../../mixins/action-button";
import { mapActions } from "vuex";

/**
 * Generic customizable button for update bulk actions in VaList component.
 * Shown after items selections. Use `updateMany` data provider method under the hood.
 */
export default {
  mixins: [ActionButton],
  inject: {
    listState: { default: undefined },
  },
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
    async onBulkUpdate() {
      let value = this.value || this.listState.selected;

      await this.updateMany({
        resource: this.listState.resource,
        params: { ids: value.map(({ id }) => id), data: this.action },
      });

      /**
       * Cleanup selected elements
       */
      this.$emit("input", []);
      this.listState.selected = [];
      this.refresh(this.listState.resource);
    },
  },
};
</script>
