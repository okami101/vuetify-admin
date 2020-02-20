<template>
  <v-form ref="form" @submit.prevent="onSave">
    <v-card>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-toolbar flat color="grey lighten-4">
        <va-save-button></va-save-button>
        <v-spacer></v-spacer>
        <va-delete-button v-if="can('delete')"></va-delete-button>
      </v-toolbar>
    </v-card>
  </v-form>
</template>

<script>
import Form from "../../../mixins/form";

export default {
  name: "SimpleForm",
  mixins: [Form]
};
</script>
