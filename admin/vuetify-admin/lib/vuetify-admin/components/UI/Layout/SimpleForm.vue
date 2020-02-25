<template>
  <va-form :resource="getResource" @saved="onSaved">
    <v-card>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <va-form-save :resource="getResource" :item="record"></va-form-save>
    </v-card>
  </va-form>
</template>

<script>
import Form from "vuetify-admin/mixins/form";

export default {
  name: "SimpleForm",
  mixins: [Form]
};
</script>
