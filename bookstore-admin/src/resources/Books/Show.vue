<template>
  <va-show :title="({ title }) => `Detail of book '${title}'`">
    <va-simple-show-layout :fields="fields"></va-simple-show-layout>
  </va-show>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { value: "isbn", text: "ISBN" },
        { value: "title", text: "Title" },
        { value: "description", text: "Description" },
        { value: "author", text: "Author" },
        { value: "publication_date", text: "Publication date" }
      ]
    };
  }
};
</script>
