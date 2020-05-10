<template>
  <span v-html="value"></span>
</template>

<script>
import Field from "../../../mixins/field";

export default {
  name: "RichTextField",
  mixins: [Field],
};
</script>
