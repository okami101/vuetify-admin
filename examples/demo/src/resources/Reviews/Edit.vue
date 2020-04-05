<template>
  <va-edit>
    <reviews-form :id="id" :title="title" :item="item"></reviews-form>
  </va-edit>
</template>

<script>
import ReviewsForm from "./Form";

export default {
  props: ["id", "title", "item"],
  components: {
    ReviewsForm,
  },
};
</script>
