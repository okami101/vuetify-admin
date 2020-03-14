<template>
  <va-edit v-slot="{ item }">
    <books-form :item="item"></books-form>
  </va-edit>
</template>

<script>
import BooksForm from "./Form";

export default {
  components: {
    BooksForm
  }
};
</script>
