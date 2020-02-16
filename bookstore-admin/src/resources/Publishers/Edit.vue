<template>
  <va-edit>
    <va-simple-form :fields="fields"></va-simple-form>
  </va-edit>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        "name",
        "founder",
        {
          source: "description",
          type: "text"
        },
        "headquarter",
        {
          source: "opening_date",
          type: "date"
        }
      ]
    };
  }
};
</script>
