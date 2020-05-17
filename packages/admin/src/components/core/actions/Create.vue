<template>
  <va-action-page :title="title">
    <template slot="actions">
      <va-list-button :resource="resource"></va-list-button>
      <slot name="actions"></slot>
      <va-locale-button :resource="resource"></va-locale-button>
    </template>
    <slot></slot>
  </va-action-page>
</template>

<script>
import Resource from "../../../mixins/resource";

export default {
  name: "Create",
  mixins: [Resource],
  props: {
    title: String,
  },
};
</script>
