<template>
  <span v-html="value"></span>
</template>

<script>
import Field from "vue-relay-admin/mixins/field";

export default {
  name: "RichTextField",
  mixins: [Field],
};
</script>
