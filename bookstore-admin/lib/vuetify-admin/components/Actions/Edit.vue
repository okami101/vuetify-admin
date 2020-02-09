<template>
  <va-page :title="title">
    <slot name="action" slot="actions-header">
      <va-list-button></va-list-button>
      <va-show-button></va-show-button>
      <va-delete-button></va-delete-button>
    </slot>
    <slot></slot>
  </va-page>
</template>

<script>
export default {
  name: "Edit",
  props: {
    title: [String, Function]
  }
};
</script>
