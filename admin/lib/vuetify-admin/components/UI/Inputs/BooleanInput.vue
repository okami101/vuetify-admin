<template>
  <v-switch
    :false-value="false"
    :true-value="true"
    :input-value="input"
    v-bind="commonProps"
    @change="changeState"
  ></v-switch>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "BooleanInput",
  mixins: [Input],
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeState(value) {
      this.change(value);
      this.update(value);
    }
  }
};
</script>
