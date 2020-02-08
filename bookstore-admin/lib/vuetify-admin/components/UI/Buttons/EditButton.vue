<template>
  <v-btn text :to="`/${$route.meta.resource}/${id}/edit`" color="blue">
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
    id: [Number, String],
    icon: {
      type: String,
      default: "mdi-pencil"
    },
    label: {
      type: String,
      default: "Edit"
    }
  }
};
</script>
