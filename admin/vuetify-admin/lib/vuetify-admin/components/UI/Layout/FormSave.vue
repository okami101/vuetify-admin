<template>
  <v-toolbar flat color="grey lighten-4">
    <va-save-button></va-save-button>
    <v-spacer></v-spacer>
    <va-delete-button></va-delete-button>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FormSave"
};
</script>
