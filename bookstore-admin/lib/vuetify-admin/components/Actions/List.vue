<template>
  <va-page :title="title">
    <slot></slot>
  </va-page>
</template>

<script>
export default {
  name: "List",
  props: {
    title: [String, Function]
  }
};
</script>
