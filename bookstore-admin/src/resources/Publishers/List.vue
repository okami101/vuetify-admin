<template>
  <va-list>
    <va-datagrid :fields="fields" :filters="filters"></va-datagrid>
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
      ],
      filters: [
        { value: "q", icon: "mdi-magnify", alwaysOn: true },
        { value: "name" },
        { value: "founder" },
        { value: "headquarter" }
      ]
    };
  }
};
</script>
