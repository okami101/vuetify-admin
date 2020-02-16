<template>
  <va-list>
    <va-datagrid :fields="fields" :filters="filters"></va-datagrid>
  </va-list>
</template>

<script>
export default {
  data() {
    return {
      fields: ["isbn", "title", "author", "publication_date"],
      filters: [
        { source: "q", icon: "mdi-magnify", alwaysOn: true },
        "title",
        "author"
      ]
    };
  }
};
</script>
