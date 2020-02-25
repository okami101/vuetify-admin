<template>
  <v-toolbar flat color="grey lighten-4">
    <va-save-button></va-save-button>
    <v-spacer></v-spacer>
    <va-delete-button
      v-if="item.id"
      :item="item"
      :resource="resource"
      redirect
    ></va-delete-button>
  </v-toolbar>
</template>

<script>
export default {
  name: "FormSave",
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    resource: {
      type: String,
      required: true
    }
  }
};
</script>
