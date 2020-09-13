<template>
  <va-delete-button
    :resource="listState.resource"
    @delete="onBulkDelete"
  ></va-delete-button>
</template>

<script>
/**
 * Button for delete bulk actions for VaList. Shown after items selections.
 * Keep all VaDeleteButton feature and use `deleteMany` data provider method under the hood.
 */
export default {
  inject: {
    listState: { default: undefined },
  },
  props: {
    /**
     * Selected resources items.
     */
    value: Array,
  },
  computed: {
    currentResource() {
      return this.$admin.getResource(this.listState.resource);
    },
  },
  methods: {
    async onBulkDelete() {
      let value = this.value || this.listState.selected;

      if (
        await this.$admin.confirm(
          this.$t("va.confirm.delete_many_title", {
            resource: this.currentResource.getName(value.length).toLowerCase(),
            count: value.length,
          }),
          this.$t("va.confirm.delete_many_message", {
            resource: this.currentResource.getName(value.length).toLowerCase(),
            count: value.length,
          })
        )
      ) {
        await this.$store.dispatch(`${this.listState.resource}/deleteMany`, {
          ids: value.map(({ id }) => id),
        });

        /**
         * Cleanup selected elements
         */
        this.$emit("input", []);
        this.listState.selected = [];
        this.$store.dispatch("api/refresh", this.listState.resource);
      }
    },
  },
};
</script>
