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
        { source: "name", required: true },
        { source: "founder", required: true },
        {
          source: "description",
          type: "text",
          required: true
        },
        { source: "headquarter", required: true },
        {
          source: "opening_date",
          type: "date",
          required: true
        }
      ]
    };
  }
};
</script>
