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
        { value: "book_id", type: "reference" },
        { value: "rating" },
        { value: "body", type: "text" },
        { value: "author" },
        { value: "publication_date", type: "date" }
      ]
    };
  }
};
</script>
