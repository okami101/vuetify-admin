<template>
  <va-show>
    <va-simple-show>
      <star-rating-field source="rating"></star-rating-field>
      <va-text-field source="body"></va-text-field>
      <va-text-field source="author"></va-text-field>
      <va-text-field source="publication_date"></va-text-field>
    </va-simple-show>
  </va-show>
</template>

<script>
import StarRatingField from "../../components/fields/StarRatingField";

export default {
  components: {
    StarRatingField
  }
};
</script>
