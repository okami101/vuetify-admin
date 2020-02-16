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
        { source: "name", sortable: true },
        { source: "founder", sortable: true },
        { source: "headquarter", sortable: true },
        { source: "opening_date", sortable: true }
      ],
      filters: [
        { source: "q", icon: "mdi-magnify", alwaysOn: true },
        { source: "name" },
        { source: "founder" },
        { source: "headquarter" }
      ]
    };
  }
};
</script>
