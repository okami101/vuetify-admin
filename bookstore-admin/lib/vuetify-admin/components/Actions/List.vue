<template>
  <va-page :title="getTitle">
    <slot></slot>
  </va-page>
</template>

<script>
export default {
  name: "List",
  props: {
    title: [String, Function]
  },
  computed: {
    getTitle() {
      let { label } = this.$route.meta;
      return this.title || `List of ${label.toLowerCase()}`;
    }
  }
};
</script>
