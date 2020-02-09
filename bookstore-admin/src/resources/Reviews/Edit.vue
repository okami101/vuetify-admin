<template>
  <va-edit>
    <va-simple-form :fields="fields"></va-simple-form>
  </va-edit>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { value: "book_id", text: "Book", type: "reference" },
        { value: "rating", text: "Rating" },
        { value: "body", text: "Body", type: "text" },
        { value: "author", text: "Author" },
        { value: "publication_date", text: "Publication date", type: "date" }
      ]
    };
  }
};
</script>
