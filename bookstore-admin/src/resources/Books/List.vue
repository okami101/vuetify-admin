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
        { source: "isbn", sortable: true },
        { source: "title", sortable: true },
        { source: "author", sortable: true },
        { source: "publication_date", sortable: true }
      ],
      filters: [
        { source: "q", icon: "mdi-magnify", alwaysOn: true },
        { source: "title" },
        { source: "author" }
      ]
    };
  }
};
</script>
