<template>
  <v-btn
    text
    exact
    :to="`/${$route.meta.resource}/${resource.id}`"
    @click="$emit('show', resource)"
    :color="color"
  >
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: "ShowButton",
  props: {
    resource: {
      type: Object,
      default: () => {}
    },
    icon: {
      type: String,
      default: "mdi-eye"
    },
    label: {
      type: String,
      default: "Show"
    },
    color: {
      type: String,
      default: "green"
    }
  }
};
</script>
