<template>
  <v-btn text :to="to" @click="$emit('show')" :color="color">
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
      default: "primary"
    },
    to: {
      type: [String, Object],
      default: null
    }
  }
};
</script>
