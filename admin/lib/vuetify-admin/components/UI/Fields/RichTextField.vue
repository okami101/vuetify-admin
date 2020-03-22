<template>
  <span v-html="value"></span>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "RichTextField",
  mixins: [Field],
};
</script>
