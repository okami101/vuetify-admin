<template>
  <va-show>
    <va-simple-show :fields="fields"></va-simple-show>
  </va-show>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { value: "name" },
        { value: "founder" },
        { value: "description" },
        { value: "headquarter" },
        { value: "opening_date" }
      ]
    };
  }
};
</script>
