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
        { source: "rating", sortable: true },
        { source: "author", sortable: true },
        { source: "publication_date", sortable: true }
      ],
      filters: [
        { source: "q", icon: "mdi-magnify", alwaysOn: true },
        { source: "rating" },
        { source: "author" }
      ]
    };
  }
};
</script>
