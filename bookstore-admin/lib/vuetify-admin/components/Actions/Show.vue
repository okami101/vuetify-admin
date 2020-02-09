<template>
  <va-page :title="title">
    <slot :id="item.id" name="action" slot="actions-header">
      <va-list-button></va-list-button>
      <va-edit-button :resource="item"></va-edit-button>
      <va-delete-button
        :resource="item"
        @deleted="$router.push(`/${$route.meta.resource}`)"
      ></va-delete-button>
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
      item: this.$route.meta.model
    };
  }
};
</script>
