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
          <va-select-input
            source="publisher"
            model="publisher_id"
            reference="publishers"
            :fields="['name']"
            option-text="name"
          ></va-select-input>
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
          <va-autocomplete-input
            source="authors"
            model="author_ids"
            multiple
            reference="authors"
            :fields="['name']"
            option-text="name"
          ></va-autocomplete-input>
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
