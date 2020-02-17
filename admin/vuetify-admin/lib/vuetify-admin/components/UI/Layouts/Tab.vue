<template>
  <v-card flat>
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Tab",
  props: {
    id: String,
    icon: String,
    label: String
  }
};
</script>
