<template>
  <v-textarea
    v-if="multiline"
    v-bind="commonProps"
    auto-grow
    :filled="filled"
    :append-icon="icon"
    @change="change"
    @input="update"
  ></v-textarea>
  <v-text-field
    v-else
    v-bind="commonProps"
    :filled="filled"
    :append-icon="icon"
    @change="change"
    @input="update"
    :type="type"
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
    type: String,
    filled: {
      type: Boolean,
      default: true
    }
  }
};
</script>
