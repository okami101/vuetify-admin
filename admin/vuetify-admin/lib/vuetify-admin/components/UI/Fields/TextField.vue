<template>
  <span>{{ record[source] }}</span>
</template>

<script>
import Field from "../../../mixins/field";

export default {
  name: "TextField",
  mixins: [Field]
};
</script>
