<template>
  <span>{{ value }}</span>
</template>

<script>
export default {
  name: "TextField",
  props: {
    source: String,
    label: String,
    value: String
  }
};
</script>
