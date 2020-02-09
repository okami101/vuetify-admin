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
        { value: "name", text: "Name" },
        { value: "founder", text: "Founder" },
        { value: "description", text: "Description" },
        { value: "headquarter", text: "Headquarter" },
        { value: "opening_date", text: "Opening date" }
      ]
    };
  }
};
</script>
