<template>
  <va-simple-form>
    <v-row>
      <v-col sm="3">
        <va-reference-input
          reference="books"
          :fields="['id', 'title', 'author']"
        >
          <va-autocomplete-input source="book_id" option-text="title">
            <template v-slot:item="{ item }">
              {{ item.title }} ({{ item.author }})
            </template>
          </va-autocomplete-input>
        </va-reference-input>
        <va-radio-group-input source="status" enum></va-radio-group-input>
        <va-rating-input source="rating"></va-rating-input>
        <va-text-input source="body" multiline></va-text-input>
        <va-text-input source="author"></va-text-input>
        <va-date-input source="publication_date" format="long"></va-date-input>
      </v-col>
    </v-row>
  </va-simple-form>
</template>
