<template>
  <v-btn text exact :to="`/${$route.meta.resource}`" :color="color">
    <v-icon small class="mr-2">
      {{ icon }}
    </v-icon>
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: "ListButton",
  props: {
    icon: {
      type: String,
      default: "mdi-view-list"
    },
    label: {
      type: String,
      default: "List"
    },
    color: {
      type: String,
      default: "primary"
    }
  }
};
</script>
