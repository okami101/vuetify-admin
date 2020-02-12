<template>
  <action-page :title="title">
    <slot name="action" slot="actions">
      <va-list-button></va-list-button>
      <va-show-button></va-show-button>
      <va-delete-button></va-delete-button>
    </slot>
    <slot></slot>
  </action-page>
</template>

<script>
import ActionPage from "../Layouts/ActionPage";

export default {
  name: "Edit",
  components: {
    ActionPage
  },
  props: {
    title: [String, Function]
  }
};
</script>
