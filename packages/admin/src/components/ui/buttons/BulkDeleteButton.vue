<template>
  <va-delete-button
    :resource="resource"
    @delete="onBlukDelete"
  ></va-delete-button>
</template>

<script>
import Resource from "../../../mixins/resource";
import { mapActions } from "vuex";

/**
 * Button for delete bulk actions for VaList. Shown after items selections.
 * Keep all VaDeleteButton feature and use `deleteMany` data provider method under the hood.
 * @displayName VaBulkDeleteButton
 */
export default {
  mixins: [Resource],
  props: {
    /**
     * Selected resources items.
     */
    value: Array,
  },
  methods: {
    ...mapActions({
      deleteMany: "api/deleteMany",
      refresh: "api/refresh",
    }),
    async onBlukDelete() {
      if (
        await this.$admin.confirm(
          this.$t("va.confirm.delete_many_title", {
            resource: this.$tc(
              `resources.${this.resource}.name`,
              this.value.length
            ).toLowerCase(),
            count: this.value.length,
          }),
          this.$t("va.confirm.delete_many_message", {
            resource: this.$tc(
              `resources.${this.resource}.name`,
              this.value.length
            ).toLowerCase(),
            count: this.value.length,
          })
        )
      ) {
        await this.deleteMany({
          resource: this.resource,
          params: { ids: this.value.map(({ id }) => id) },
        });

        /**
         * Cleanup selected elements
         */
        this.$emit("input", []);
        this.refresh(this.resource);
      }
    },
  },
};
</script>
