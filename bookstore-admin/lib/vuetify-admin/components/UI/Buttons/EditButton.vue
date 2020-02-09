<template>
  <v-btn
    text
    :to="`/${$route.meta.resource}/${resource.id}/edit`"
    @click="$emit('edit', resource)"
    :color="color"
  >
    <v-icon small class="mr-2">
      {{ icon }}
    </v-icon>
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: "EditButton",
  props: {
    resource: {
      type: Object,
      default: () => {}
    },
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
      default: "blue"
    }
  }
};
</script>
