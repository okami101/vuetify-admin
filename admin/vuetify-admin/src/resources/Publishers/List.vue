<template>
  <va-list>
    <va-datagrid :fields="fields" :filters="filters"></va-datagrid>
  </va-list>
</template>

<script>
export default {
  data() {
    return {
      fields: ["name", "founder", "headquarter", "opening_date"],
      filters: [
        { source: "q", icon: "mdi-magnify", alwaysOn: true },
        "name",
        "founder",
        "headquarter"
      ]
    };
  }
};
</script>
