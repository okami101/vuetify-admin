<template>
  <va-list title="Reviews list">
    <va-datagrid :headers="headers"></va-datagrid>
  </va-list>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { value: "rating", text: "Rating", sortable: true },
        { value: "author", text: "Author", sortable: true },
        { value: "publication_date", text: "Publication date", sortable: true }
      ]
    };
  }
};
</script>
