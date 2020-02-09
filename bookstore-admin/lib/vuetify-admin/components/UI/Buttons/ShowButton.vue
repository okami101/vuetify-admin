<template>
  <v-btn
    text
    exact
    :to="`/${$route.meta.resource}/${currentResource.id}`"
    @click="$emit('show', currentResource)"
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
    resource: Object,
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
  },
  computed: {
    currentResource() {
      return this.resource || this.$route.meta.model;
    }
  }
};
</script>
