<template>
  <va-page :title="title">
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
