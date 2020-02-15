<template>
  <va-show>
    <va-simple-show :fields="fields">
      <template v-slot:rating="{ value }">
        <star-rating-field :rating="value"></star-rating-field>
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
      fields: [
        { value: "rating" },
        { value: "body" },
        { value: "author" },
        { value: "publication_date" }
      ]
    };
  }
};
</script>
