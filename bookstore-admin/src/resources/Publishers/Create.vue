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
        { value: "name", text: "Name", required: true },
        { value: "founder", text: "Founder", required: true },
        {
          value: "description",
          text: "Description",
          type: "text",
          required: true
        },
        { value: "headquarter", text: "Headquarter", required: true },
        {
          value: "opening_date",
          text: "Opening date",
          type: "date",
          required: true
        }
      ]
    };
  }
};
</script>
