<template>
  <action-page :title="title || defaultTitle">
    <slot name="action" slot="actions">
      <va-list-button></va-list-button>
      <va-show-button></va-show-button>
      <va-delete-button></va-delete-button>
    </slot>
    <slot></slot>
  </action-page>
</template>

<script>
import Page from "../../mixins/page";

export default {
  name: "Edit",
  mixins: [Page],
  computed: {
    defaultTitle() {
      if (!this.resource) {
        return;
      }
      return `${this.$t("va.actions.edit")} ${this.$tc(
        `resources.${this.resourceName}`,
        1
      ).toLowerCase()} #${this.resource.id}`;
    }
  }
};
</script>
