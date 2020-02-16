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
        { source: "book_id", type: "reference" },
        { source: "rating" },
        { source: "body", type: "text" },
        { source: "author" },
        { source: "publication_date", type: "date" }
      ]
    };
  }
};
</script>
