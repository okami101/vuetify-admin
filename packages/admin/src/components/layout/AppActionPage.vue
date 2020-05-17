<template>
  <div>
    <slot name="header">
      <div class="d-flex align-center mb-2">
        <h1 class="display-2">
          {{ title }}
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
  name: "AppActionPage",
  props: {
    title: String,
  },
};
</script>
