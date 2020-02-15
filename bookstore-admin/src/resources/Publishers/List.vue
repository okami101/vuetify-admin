<template>
  <va-list>
    <va-datagrid :fields="fields"></va-datagrid>
  </va-list>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { value: "name", sortable: true },
        { value: "founder", sortable: true },
        { value: "headquarter", sortable: true },
        { value: "opening_date", sortable: true }
      ]
    };
  }
};
</script>
