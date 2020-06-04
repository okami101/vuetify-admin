<template>
  <va-form :id="id" :item="item">
    <v-row justify="center">
      <v-col sm="4">
        <v-card>
          <v-card-text>
            <va-autocomplete-input
              source="book"
              reference="books"
              item-value="@id"
              search-query="title"
            ></va-autocomplete-input>
            <va-text-input source="body" multiline></va-text-input>
            <va-rating-input source="rating"></va-rating-input>
            <va-text-input source="author"></va-text-input>
            <va-date-input source="publicationDate"></va-date-input>
            <va-save-button></va-save-button>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </va-form>
</template>

<script>
export default {
  props: ["id", "item"],
};
</script>
