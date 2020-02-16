<template>
  <action-page :title="title || defaultTitle">
    <slot name="action" slot="actions">
      <va-list-button></va-list-button>
      <va-edit-button></va-edit-button>
      <va-delete-button></va-delete-button>
    </slot>
    <slot></slot>
  </action-page>
</template>

<script>
import Page from "../../mixins/page";

export default {
  name: "Show",
  mixins: [Page],
  computed: {
    defaultTitle() {
      if (!this.resource) {
        return;
      }
      return `${this.$tc(`resources.${this.resourceName}`, 1)} #${
        this.resource.id
      }`;
    }
  }
};
</script>
