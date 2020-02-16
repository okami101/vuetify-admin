<template>
  <action-page :title="title">
    <slot></slot>
  </action-page>
</template>

<script>
import ActionPage from "../Layouts/ActionPage";

export default {
  name: "List",
  components: {
    ActionPage
  },
  props: {
    title: [String, Function]
  }
};
</script>
