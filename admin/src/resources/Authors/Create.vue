<template>
  <va-create>
    <authors-form :item="item"></authors-form>
  </va-create>
</template>

<script>
import AuthorsForm from "./Form";

export default {
  props: ["title", "item"],
  components: {
    AuthorsForm,
  },
};
</script>
