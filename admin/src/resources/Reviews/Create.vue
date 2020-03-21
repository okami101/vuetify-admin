<template>
  <va-create>
    <reviews-form :item="item"></reviews-form>
  </va-create>
</template>

<script>
import ReviewsForm from "./Form";

export default {
  props: ["item"],
  components: {
    ReviewsForm
  }
};
</script>
