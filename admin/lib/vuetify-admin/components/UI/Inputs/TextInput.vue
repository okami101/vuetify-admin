<template>
  <v-textarea
    v-if="multiline"
    v-model="input"
    v-bind="commonProps"
    auto-grow
    :filled="filled"
    :append-icon="icon"
    @change="change"
  ></v-textarea>
  <v-text-field
    v-else
    v-model="input"
    v-bind="commonProps"
    :filled="filled"
    :append-icon="icon"
    @change="change"
  ></v-text-field>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "TextInput",
  mixins: [Input],
  props: {
    multiline: Boolean,
    icon: String,
    filled: {
      type: Boolean,
      default: true
    }
  }
};
</script>
