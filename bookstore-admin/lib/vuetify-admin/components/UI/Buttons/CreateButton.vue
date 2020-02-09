<template>
  <v-btn text exact :to="`/${$route.meta.resource}/create`" :color="color">
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: "CreateButton",
  props: {
    icon: {
      type: String,
      default: "mdi-plus"
    },
    label: {
      type: String,
      default: "Create"
    },
    color: {
      type: String,
      default: "primary"
    }
  }
};
</script>
