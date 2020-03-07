<template>
  <v-switch
    :label="label"
    :hint="hint"
    :rules="rules"
    :error-messages="errorMessages"
    :hide-details="hideDetails"
    :dense="dense"
    @change="change"
    @input="update"
  ></v-switch>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "ArrayInput",
  mixins: [Input]
};
</script>
