<template>
  <va-action-button
    v-if="hasAction('delete')"
    :show-label="!icon"
    :label="$t('va.actions.delete')"
    icon="mdi-trash-can"
    :color="color || 'red'"
    text
    @click="onDelete"
  ></va-action-button>
</template>

<script>
import Item from "../../../mixins/item";
import Button from "../../../mixins/button";
import { mapActions } from "vuex";

/**
 * Button for all delete resource action. Comes with confirm dialog.
 * Autohide if no delete action available unless show prop is active.
 * @displayName VaDeleteButton
 */
export default {
  mixins: [Item, Button],
  props: {
    /**
     * Redirect to resource list after successful deletion.
     * Default redirect active if current page is resource being deleted.
     */
    redirect: Boolean,
  },
  methods: {
    ...mapActions({
      delete: "api/delete",
      refresh: "api/refresh",
    }),
    async onDelete() {
      if (!this.item) {
        /**
         * Used on bulk delete
         */
        this.$emit("delete");
        return;
      }

      if (
        await this.$admin.confirm(
          this.$t("va.confirm.delete_title", {
            resource: this.$tc(
              `resources.${this.resource}.name`,
              1
            ).toLowerCase(),
            id: this.item.id,
          }),
          this.$t("va.confirm.delete_message", {
            resource: this.$tc(
              `resources.${this.resource}.name`,
              1
            ).toLowerCase(),
            id: this.item.id,
          })
        )
      ) {
        await this.delete({
          resource: this.resource,
          params: { id: this.item.id },
        });

        if (this.redirect) {
          this.$router.push({ name: `${this.resource}_list` });
          return;
        }

        this.refresh(this.resource);
        this.$emit("deleted");
      }
    },
  },
};
</script>
