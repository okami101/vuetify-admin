<template>
  <va-action-button
    :hide-label="icon"
    :label="$t('va.actions.dissociate')"
    icon="mdi-link-off"
    :color="color || 'red'"
    text
    @click="onDissociate"
  ></va-action-button>
</template>

<script>
import Button from "../../../mixins/button";

/**
 * Action button for resource dissociation. Used on data tables with association enabled.
 * Comes with confirm dialog.
 */
export default {
  mixins: [Button],
  props: {
    /**
     * POST Request property name for update.
     */
    source: String,
    /**
     * Id of resource to unlink.
     */
    sourceId: [Number, String],
    /**
     * Name of resource to be unlinked.
     */
    sourceResource: String,
  },
  methods: {
    async onDissociate() {
      if (
        await this.$admin.confirm(
          this.$t("va.confirm.dissociate_title", {
            targetResource: this.currentResource.singularName.toLowerCase(),
            targetId: this.item.id,
          }),
          this.$t("va.confirm.dissociate_message", {
            sourceResource: this.$admin
              .getResource(this.sourceResource)
              .singularName.toLowerCase(),
            sourceId: this.sourceId,
            targetResource: this.currentResource.singularName.toLowerCase(),
            targetId: this.item.id,
          })
        )
      ) {
        await this.$store.dispatch(`${this.resource}/update`, {
          id: this.item.id,
          data: { [`remove_${this.source}`]: this.sourceId },
        });

        this.$store.dispatch("api/refresh", this.resource);

        /**
         * Triggered on successful dissociation of resource item.
         */
        this.$emit("dissociated");
      }
    },
  },
};
</script>
