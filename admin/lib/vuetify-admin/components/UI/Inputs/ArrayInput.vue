<template>
  <va-input v-bind="$props">
    <slot :resource="resource" :items="input || []"></slot>
  </va-input>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "ArrayInput",
  mixins: [Input],
  props: {
    inputs: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .v-input__slot {
  display: block;
}
::v-deep .v-label {
  display: inline-block;
  margin-bottom: 0.5rem;
}
</style>
