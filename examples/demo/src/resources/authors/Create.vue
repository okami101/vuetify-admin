<template>
  <va-create>
    <authors-form :title="title" :item="item"></authors-form>
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
