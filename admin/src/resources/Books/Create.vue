<template>
  <va-create>
    <books-form :item="item"></books-form>
  </va-create>
</template>

<script>
import BooksForm from "./Form";

export default {
  props: ["title", "item"],
  components: {
    BooksForm,
  },
};
</script>
