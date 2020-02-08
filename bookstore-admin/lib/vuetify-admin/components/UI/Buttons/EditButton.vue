<template>
  <v-btn text :to="to" @click="$emit('edit')" :color="color">
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
    },
    to: {
      type: [String, Object],
      default: null
    }
  }
};
</script>
