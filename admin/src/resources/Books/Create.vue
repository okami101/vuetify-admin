<template>
  <va-create>
    <books-form :item="item"></books-form>
  </va-create>
</template>

<script>
import BooksForm from "./Form";

export default {
  props: ["item"],
  components: {
    BooksForm
  }
};
</script>
