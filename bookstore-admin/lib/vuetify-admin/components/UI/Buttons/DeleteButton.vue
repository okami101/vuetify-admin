<template>
  <v-btn text @click="$emit('on-delete', id)" color="red">
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
    id: [Number, String],
    icon: {
      type: String,
      default: "mdi-trash-can"
    },
    label: {
      type: String,
      default: "Delete"
    }
  }
};
</script>
