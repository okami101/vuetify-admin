<template>
  <va-create>
    <reviews-form :title="title" :item="item"></reviews-form>
  </va-create>
</template>

<script>
import ReviewsForm from "./Form";

export default {
  props: ["title", "item"],
  components: {
    ReviewsForm,
  },
};
</script>
