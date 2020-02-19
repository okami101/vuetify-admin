<template>
  <va-list>
    <va-datagrid :fields="['id', 'rating', 'author', 'publication_date']">
      <template v-slot:filters>
        <va-text-input
          source="q"
          icon="mdi-magnify"
          :always-on="true"
        ></va-text-input>
        <va-text-input source="rating"></va-text-input>
        <va-text-input source="author"></va-text-input>
      </template>
      <template v-slot:rating="{ item }">
        <star-rating-field :item="item" source="rating"></star-rating-field>
      </template>
      <template v-slot:row-actions="{ item }">
        <va-show-button :item="item"></va-show-button>
        <va-edit-button :item="item"></va-edit-button>
        <va-delete-button :item="item"></va-delete-button>
      </template>
    </va-datagrid>
  </va-list>
</template>

<script>
import StarRatingField from "../../components/fields/StarRatingField";

export default {
  components: {
    StarRatingField
  }
};
</script>
