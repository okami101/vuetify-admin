<template>
  <action-page :title="title || defaultTitle">
    <slot></slot>
  </action-page>
</template>

<script>
import Page from "../../mixins/page";

export default {
  name: "List",
  mixins: [Page],
  computed: {
    defaultTitle() {
      return this.$tc(`resources.${this.resourceName}`, 10);
    }
  }
};
</script>
