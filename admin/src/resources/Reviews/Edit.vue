<template>
  <va-edit v-slot="{ item }">
    <reviews-form :item="item"></reviews-form>
  </va-edit>
</template>

<script>
import ReviewsForm from "./Form";

export default {
  components: {
    ReviewsForm
  }
};
</script>
