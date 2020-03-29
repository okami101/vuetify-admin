<template>
  <va-edit>
    <reviews-form :id="id" :item="item"></reviews-form>
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
