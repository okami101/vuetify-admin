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
        "rating",
        { source: "body", type: "text" },
        "author",
        { source: "publication_date", type: "date" }
      ]
    };
  }
};
</script>
