<template>
  <div>
    <div class="d-flex mb-2">
      <v-spacer></v-spacer>
      <va-edit-button></va-edit-button>
    </div>
    <slot></slot>
  </div>
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
