<template>
  <v-btn text @click="$emit('delete')" :color="color">
    <v-icon small class="mr-2">
      {{ icon }}
    </v-icon>
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: "DeleteButton",
  props: {
    icon: {
      type: String,
      default: "mdi-trash-can"
    },
    label: {
      type: String,
      default: "Delete"
    },
    color: {
      type: String,
      default: "red"
    }
  }
};
</script>
