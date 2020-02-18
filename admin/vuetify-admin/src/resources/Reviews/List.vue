<template>
  <va-list>
    <va-datagrid>
      <template slot="filters">
        <va-text-input
          source="q"
          icon="mdi-magnify"
          :always-on="true"
        ></va-text-input>
        <va-text-input source="rating"></va-text-input>
        <va-text-input source="author"></va-text-input>
      </template>
      <va-text-field source="id"></va-text-field>
      <star-rating-field source="rating"></star-rating-field>
      <va-text-field source="author"></va-text-field>
      <va-text-field source="publication_date"></va-text-field>
      <template slot="row-actions">
        <va-show-button></va-show-button>
        <va-edit-button></va-edit-button>
        <va-delete-button></va-delete-button>
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
