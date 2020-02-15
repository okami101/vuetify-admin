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
        { value: "isbn", sortable: true },
        { value: "title", sortable: true },
        { value: "author", sortable: true },
        { value: "publication_date", sortable: true }
      ]
    };
  }
};
</script>
