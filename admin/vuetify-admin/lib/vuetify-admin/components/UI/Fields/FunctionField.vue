<template>
  <span>{{ render({ item, value }) }}</span>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "FunctionField",
  mixins: [Field],
  props: {
    render: {
      type: Function,
      required: true
    }
  }
};
</script>
