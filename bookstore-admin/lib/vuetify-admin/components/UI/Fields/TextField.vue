<template>
  <div></div>
</template>

<script>
export default {
  name: "TextField",
  props: {
    source: String,
    label: String,
    sortable: Boolean,
    textAlign: {
      type: String,
      validator: val => ["left", "center", "right"].includes(val)
    }
  }
};
</script>
