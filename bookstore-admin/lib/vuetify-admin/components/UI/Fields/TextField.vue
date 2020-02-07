<template>
  <div></div>
</template>

<script>
export default {
  name: "TextField",
  props: {
    source: String,
    label: String,
    sortable: {
      type: Boolean
    },
    align: {
      type: String,
      validator: val => ["left", "center", "right"].includes(val)
    }
  }
};
</script>
