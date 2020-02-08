<template>
  <v-btn text :to="`/${$route.meta.resource}/${id}`" color="primary">
    <v-icon small class="mr-2">
      {{ icon }}
    </v-icon>
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: "ShowButton",
  props: {
    id: [Number, String],
    icon: {
      type: String,
      default: "mdi-eye"
    },
    label: {
      type: String,
      default: "Show"
    }
  }
};
</script>
