<template>
  <va-show>
    <va-simple-show :fields="fields"></va-simple-show>
  </va-show>
</template>

<script>
export default {
  data() {
    return {
      fields: ["name", "founder", "description", "headquarter", "opening_date"]
    };
  }
};
</script>
