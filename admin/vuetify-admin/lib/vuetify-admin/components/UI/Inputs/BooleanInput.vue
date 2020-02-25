<template>
  <v-switch
    v-model="input"
    :label="label"
    :hint="hint"
    :rules="rules"
    :error-messages="errorMessages"
    :hide-details="hideDetails"
    :dense="dense"
    @change="change"
  ></v-switch>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "BooleanInput",
  mixins: [Input]
};
</script>
