<template>
  <va-page :title="title">
    <slot name="action" slot="actions-header">
      <va-list-button></va-list-button>
      <va-edit-button :resource="resource"></va-edit-button>
      <va-delete-button :resource="resource"></va-delete-button>
    </slot>
    <slot></slot>
  </va-page>
</template>

<script>
export default {
  name: "Show",
  props: {
    title: [String, Function]
  },
  data() {
    return {
      resource: this.$route.meta.model
    };
  }
};
</script>
