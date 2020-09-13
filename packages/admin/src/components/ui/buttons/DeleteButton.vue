<template>
  <va-action-button
    v-if="hasAction('delete')"
    :hide-label="icon"
    :label="$t('va.actions.delete')"
    icon="mdi-trash-can"
    :color="color || 'red'"
    text
    @click="onDelete"
  ></va-action-button>
</template>

<script>
import Button from "../../../mixins/button";

/**
 * Button for all delete resource action. Comes with confirm dialog.
 * Auto hide if no delete action available unless show prop is active.
 */
export default {
  mixins: [Button],
  props: {
    /**
     * Redirect to resource list after successful deletion.
     * Default redirect active if current page is resource being deleted.
     */
    redirect: Boolean,
  },
  methods: {
    async onDelete() {
      if (!this.item) {
        /**
         * Custom delete action if no item.
         * Used for bulk delete button which has his custom logic.
         */
        this.$emit("delete");
        return;
      }

      if (
        await this.$admin.confirm(
          this.$t("va.confirm.delete_title", {
            resource: this.currentResource.singularName.toLowerCase(),
            id: this.item.id,
          }),
          this.$t("va.confirm.delete_message", {
            resource: this.currentResource.singularName.toLowerCase(),
            id: this.item.id,
          })
        )
      ) {
        await this.$store.dispatch(`${this.resource}/delete`, {
          id: this.item.id,
        });

        if (this.redirect) {
          this.$router.push({ name: `${this.resource}_list` });
          return;
        }

        this.$store.dispatch("api/refresh", this.resource);

        /**
         * Triggered on successful deletion of resource item.
         */
        this.$emit("deleted");
      }
    },
  },
};
</script>
