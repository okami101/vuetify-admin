<template>
  <va-page :title="getTitle">
    <slot name="action" slot="actions-header">
      <va-list-button></va-list-button>
    </slot>
    <slot></slot>
  </va-page>
</template>

<script>
export default {
  name: "Create",
  props: {
    title: [String, Function]
  },
  computed: {
    getTitle() {
      let { label } = this.$route.meta;
      return this.title || `Create new ${label.toLowerCase()}`;
    }
  }
};
</script>
