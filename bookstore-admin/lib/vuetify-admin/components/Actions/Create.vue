<template>
  <va-page :title="title">
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
  }
};
</script>
