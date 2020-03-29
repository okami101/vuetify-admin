<template>
  <va-page>
    <template slot="actions">
      <va-list-button :resource="resource"></va-list-button>
      <slot name="actions"></slot>
      <va-locale-button :resource="resource"></va-locale-button>
    </template>
    <slot></slot>
  </va-page>
</template>

<script>
import Resource from "vuetify-admin/mixins/resource";

export default {
  name: "Create",
  mixins: [Resource],
};
</script>
