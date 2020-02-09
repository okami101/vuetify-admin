<template>
  <va-list title="Publishers list">
    <va-datagrid :fields="fields"></va-datagrid>
  </va-list>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { value: "name", text: "Name", sortable: true },
        { value: "founder", text: "Founder", sortable: true },
        { value: "headquarter", text: "Headquarter", sortable: true },
        { value: "opening_date", text: "Opening date", sortable: true }
      ]
    };
  }
};
</script>
