<template>
  <v-radio-group
    v-model="input"
    :label="label"
    :hint="hint"
    :rules="rules"
    :error-messages="errorMessages"
    :hide-details="hideDetails"
    :dense="dense"
    :column="column"
  >
    <v-radio
      v-for="(e, i) in enums"
      :key="i"
      :label="`${e.text}`"
      :value="e.value"
    ></v-radio>
  </v-radio-group>
</template>

<script>
import Input from "vuetify-admin/mixins/input";
import Enum from "vuetify-admin/mixins/enum";

export default {
  name: "RadioGroupInput",
  mixins: [Input, Enum],
  props: {
    column: {
      type: Boolean,
      default: true
    }
  }
};
</script>
