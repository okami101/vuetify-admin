<template>
  <va-simple-form>
    <v-row>
      <v-col sm="3">
        <va-reference-input
          source="book_id"
          reference="books"
          property="title"
          v-slot="{ items }"
        >
          <va-autocomplete-input
            source="book_id"
            :choices="items"
            option-text="title"
          ></va-autocomplete-input>
        </va-reference-input>
        <va-radio-group-input source="status"></va-radio-group-input>
        <va-rating-input source="rating"></va-rating-input>
        <va-text-input source="body" multiline></va-text-input>
        <va-text-input source="author"></va-text-input>
        <va-date-input source="publication_date" format="long"></va-date-input>
      </v-col>
    </v-row>
  </va-simple-form>
</template>
