<template>
  <va-create>
    <va-simple-form :fields="fields"></va-simple-form>
  </va-create>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { value: "name", required: true },
        { value: "founder", required: true },
        {
          value: "description",
          type: "text",
          required: true
        },
        { value: "headquarter", required: true },
        {
          value: "opening_date",
          type: "date",
          required: true
        }
      ]
    };
  }
};
</script>
