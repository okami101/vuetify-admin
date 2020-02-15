<template>
  <va-list>
    <va-datagrid :fields="fields" :filters="filters">
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
      fields: [
        { value: "rating", sortable: true },
        { value: "author", sortable: true },
        { value: "publication_date", sortable: true }
      ],
      filters: [
        { value: "q", icon: "mdi-magnify", alwaysOn: true },
        { value: "rating" },
        { value: "author" }
      ]
    };
  }
};
</script>
