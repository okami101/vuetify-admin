<template>
  <va-edit>
    <reviews-form :item="item"></reviews-form>
  </va-edit>
</template>

<script>
import ReviewsForm from "./Form";

export default {
  props: {
    item: Object
  },
  components: {
    ReviewsForm
  }
};
</script>
