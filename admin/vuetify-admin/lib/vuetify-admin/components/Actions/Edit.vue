<template>
  <div>
    <va-aside-content>
      <slot name="aside" v-bind="{ item }"></slot>
    </va-aside-content>
    <div class="d-flex mb-2">
      <v-spacer></v-spacer>
      <va-show-button></va-show-button>
    </div>
    <slot></slot>
  </div>
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
