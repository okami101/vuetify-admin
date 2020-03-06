<template>
  <va-tabbed-form
    :tabs="[
      { id: 'attributes', icon: 'mdi-eye' },
      { id: 'summary', icon: 'mdi-text' }
    ]"
  >
    <template v-slot:attributes>
      <v-row>
        <v-col sm="3">
          <va-reference-input reference="publishers" property="name">
            <va-select-input source="publisher_id"></va-select-input>
          </va-reference-input>
          <va-text-input source="isbn"></va-text-input>
          <va-select-input source="category" enum></va-select-input>
          <va-text-input source="title"></va-text-input>
          <va-text-input source="description"></va-text-input>
          <va-select-input source="formats" multiple enum></va-select-input>
          <va-number-input source="price" format="currency"></va-number-input>
          <va-boolean-input source="commentable"></va-boolean-input>
          <va-date-input
            source="publication_date"
            format="long"
          ></va-date-input>
          <va-reference-input reference="reviews" property="author">
            <va-autocomplete-input
              source="review_ids"
              multiple
              option-text="author"
            ></va-autocomplete-input>
          </va-reference-input>
          <va-autocomplete-input
            source="tags"
            multiple
            taggable
          ></va-autocomplete-input>
        </v-col>
      </v-row>
    </template>
    <template v-slot:summary>
      <va-rich-text-input source="summary"></va-rich-text-input>
    </template>
  </va-tabbed-form>
</template>
