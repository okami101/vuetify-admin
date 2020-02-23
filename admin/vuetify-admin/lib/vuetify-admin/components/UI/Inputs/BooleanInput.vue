<template>
  <v-switch
    v-model="input"
    :label="getLabel"
    :hint="hint"
    :rules="getRules"
    :error-messages="errorMessages"
    :hide-details="hideDetails"
    :dense="dense"
  ></v-switch>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "BooleanInput",
  mixins: [Input]
};
</script>
