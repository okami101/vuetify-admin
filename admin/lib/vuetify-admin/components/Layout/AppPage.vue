<template>
  <div>
    <va-aside-content>
      <slot name="aside"></slot>
    </va-aside-content>
    <slot name="header">
      <div class="d-flex align-center mb-2">
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
};
</script>
