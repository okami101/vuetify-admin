<template>
  <va-list title="Reviews list">
    <va-datagrid :headers="headers">
      <template v-slot:rating="{ value }">
        <star-rating-field :rating="value"></star-rating-field>
      </template>
    </va-datagrid>
  </va-list>
</template>

<script>
import StarRatingField from "../../components/fields/StarRatingField";

export default {
  components: {
    StarRatingField
  },
  data() {
    return {
      headers: [
        { value: "rating", text: "Rating", sortable: true },
        { value: "author", text: "Author", sortable: true },
        { value: "publication_date", text: "Publication date", sortable: true }
      ]
    };
  }
};
</script>
