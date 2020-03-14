<template>
  <va-edit v-slot="{ item }">
    <authors-form :item="item"></authors-form>
  </va-edit>
</template>

<script>
import AuthorsForm from "./Form";

export default {
  components: {
    AuthorsForm
  }
};
</script>
