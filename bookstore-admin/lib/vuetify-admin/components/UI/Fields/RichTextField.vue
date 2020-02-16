<template>
  <span v-html="record[source]"></span>
</template>

<script>
import Field from "../../../mixins/field";

export default {
  name: "RichTextField",
  mixins: [Field]
};
</script>
