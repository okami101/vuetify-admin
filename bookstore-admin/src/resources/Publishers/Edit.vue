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
        { value: "name", text: "Name" },
        { value: "founder", text: "Founder" },
        { value: "description", text: "Description", type: "text" },
        { value: "headquarter", text: "Headquarter" },
        { value: "opening_date", text: "Opening date", type: "date" }
      ]
    };
  }
};
</script>
