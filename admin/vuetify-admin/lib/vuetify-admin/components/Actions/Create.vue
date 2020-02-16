<template>
  <action-page :title="title">
    <slot name="action" slot="actions">
      <va-list-button></va-list-button>
    </slot>
    <slot></slot>
  </action-page>
</template>

<script>
import ActionPage from "../Layouts/ActionPage";

export default {
  name: "Create",
  components: {
    ActionPage
  },
  props: {
    title: [String, Function]
  }
};
</script>
