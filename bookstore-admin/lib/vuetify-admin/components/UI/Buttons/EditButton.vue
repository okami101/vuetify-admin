<template>
  <v-btn
    text
    exact
    :to="`/${$route.meta.resource}/${currentResource.id}/edit`"
    @click="$emit('edit', currentResource)"
    :color="color"
  >
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: "EditButton",
  props: {
    resource: Object,
    icon: {
      type: String,
      default: "mdi-pencil"
    },
    label: {
      type: String,
      default: "Edit"
    },
    color: {
      type: String,
      default: "orange"
    }
  },
  computed: {
    currentResource() {
      return this.resource || this.$route.meta.model;
    }
  }
};
</script>
