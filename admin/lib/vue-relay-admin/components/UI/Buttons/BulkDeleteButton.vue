<template>
  <va-delete-button
    :resource="resource"
    @delete="onBlukDelete"
  ></va-delete-button>
</template>

<script>
import Resource from "vue-relay-admin/mixins/resource";
import { mapActions } from "vuex";

export default {
  name: "BulkActionButton",
  mixins: [Resource],
  props: {
    value: Array,
  },
  methods: {
    ...mapActions({
      deleteMany: "api/deleteMany",
      refresh: "api/refresh",
    }),
    async onBlukDelete() {
      if (
        await this.$confirm(
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
        this.$emit("input", []);
        this.refresh(this.resource);
      }
    },
  },
};
</script>
