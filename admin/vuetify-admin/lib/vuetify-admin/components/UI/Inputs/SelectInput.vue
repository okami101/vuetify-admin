<template>
  <v-select
    v-model="input"
    :label="label"
    :hint="hint"
    :rules="rules"
    :error-messages="errorMessages"
    :hide-details="hideDetails"
    :dense="dense"
    :filled="filled"
    :multiple="multiple"
    :items="enums"
  >
  </v-select>
</template>

<script>
import Input from "vuetify-admin/mixins/input";
import Enum from "vuetify-admin/mixins/enum";

export default {
  name: "SelectInput",
  mixins: [Input, Enum],
  props: {
    multiple: Boolean,
    filled: {
      type: Boolean,
      default: true
    }
  }
};
</script>
