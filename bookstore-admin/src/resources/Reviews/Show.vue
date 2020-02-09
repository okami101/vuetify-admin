<template>
  <va-show :title="({ author }) => `Show review of ${author}`">
    <va-simple-show-layout :fields="fields">
      <template v-slot:rating="{ value }">
        <star-rating-field :rating="value"></star-rating-field>
      </template>
    </va-simple-show-layout>
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
        { value: "rating", text: "Rating" },
        { value: "body", text: "Body" },
        { value: "author", text: "Author" },
        { value: "publication_date", text: "Publication date" }
      ]
    };
  }
};
</script>
