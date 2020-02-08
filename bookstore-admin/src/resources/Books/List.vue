<template>
  <va-list title="Books list">
    <va-datagrid :headers="headers"></va-datagrid>
  </va-list>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { value: "isbn", text: "ISBN", sortable: true },
        { value: "title", text: "Title", sortable: true },
        { value: "author", text: "Author", sortable: true },
        { value: "publication_date", text: "Publication date", sortable: true }
      ]
    };
  }
};
</script>
