<template>
  <va-edit>
    <authors-form :item="item"></authors-form>
  </va-edit>
</template>

<script>
import AuthorsForm from "./Form";

export default {
  props: {
    item: Object
  },
  components: {
    AuthorsForm
  }
};
</script>
