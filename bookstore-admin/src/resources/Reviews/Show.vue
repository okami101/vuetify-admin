<template>
  <va-show>
    <va-simple-show :fields="fields">
      <template v-slot:rating>
        <star-rating-field source="rating"></star-rating-field>
      </template>
    </va-simple-show>
  </va-show>
</template>

<script>
import StarRatingField from "../../components/fields/StarRatingField";

export default {
  components: {
    StarRatingField
  },
  data() {
    return {
      fields: ["rating", "body", "author", "publication_date"]
    };
  }
};
</script>
