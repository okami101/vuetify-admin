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
        { source: "isbn" },
        { source: "title" },
        { source: "author" },
        { source: "publication_date" }
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
