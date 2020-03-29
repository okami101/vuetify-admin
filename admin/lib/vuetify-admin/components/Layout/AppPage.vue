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
        <slot name="actions"></slot>
      </div>
    </slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppPage",
  props: {
    title: {
      type: String,
      default() {
        return this.$route.meta.title;
      },
    },
  },
};
</script>
