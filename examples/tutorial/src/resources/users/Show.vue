<template>
  <va-show :item="item">
    <va-field source="name"></va-field>
    <va-field source="email"></va-field>
  </va-show>
</template>

<script>
export default {
  props: ["item"],
};
</script>
