<template>
  <va-edit>
    <books-form :item="item"></books-form>
  </va-edit>
</template>

<script>
import BooksForm from "./Form";

export default {
  props: {
    item: Object
  },
  components: {
    BooksForm
  }
};
</script>
