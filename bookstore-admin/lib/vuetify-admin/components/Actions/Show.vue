<template>
  <va-page :title="getTitle">
    <slot name="action" slot="actions">
      <va-list-button></va-list-button>
      <va-edit-button></va-edit-button>
      <va-delete-button></va-delete-button>
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
  computed: {
    getTitle() {
      let { model, label, stringify } = this.$route.meta;
      return (
        this.title ||
        `Show ${label.toLowerCase()} "${stringify(model)}" (#${model.id})`
      );
    }
  }
};
</script>
