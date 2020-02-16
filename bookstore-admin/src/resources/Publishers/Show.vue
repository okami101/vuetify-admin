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
        { source: "name" },
        { source: "founder" },
        { source: "description" },
        { source: "headquarter" },
        { source: "opening_date" }
      ]
    };
  }
};
</script>
