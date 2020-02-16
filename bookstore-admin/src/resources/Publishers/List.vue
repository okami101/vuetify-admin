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
        { source: "name" },
        { source: "founder" },
        { source: "headquarter" },
        { source: "opening_date" }
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
