<template>
  <div>
    <va-aside-content>
      <slot name="aside"></slot>
    </va-aside-content>
    <slot name="header">
      <div class="d-flex align-center mb-2">
        <h1 class="display-2 grey--text text--darken-3">
          {{ $route.meta.title }}
        </h1>
        <v-spacer></v-spacer>
        <va-list-button :resource="resource"></va-list-button>
        <slot name="actions"></slot>
        <va-locale-button :resource="resource"></va-locale-button>
      </div>
    </slot>
    <slot></slot>
  </div>
</template>

<script>
import Resource from "vuetify-admin/mixins/resource";

export default {
  name: "Create",
  mixins: [Resource],
};
</script>
