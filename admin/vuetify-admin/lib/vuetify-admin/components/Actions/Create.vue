<template>
  <div>
    <va-aside-content>
      <slot name="aside"></slot>
    </va-aside-content>
    <slot name="action" slot="actions">
      <va-list-button></va-list-button>
    </slot>
    <slot></slot>
  </div>
</template>

<script>
import Page from "../../mixins/page";

export default {
  name: "Create",
  mixins: [Page],
  computed: {
    defaultTitle() {
      return `${this.$t("va.actions.create")} ${this.$tc(
        `resources.${this.resourceName}`,
        1
      ).toLowerCase()}`;
    }
  }
};
</script>
