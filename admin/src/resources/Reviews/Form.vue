<template>
  <va-form :item="item" :saving.sync="saving">
    <v-card>
      <v-card-text>
        <v-row>
          <v-col sm="3">
            <va-autocomplete-input
              source="book"
              model="book_id"
              option-text="title"
              reference="books"
              :fields="['title', 'isbn']"
            >
              <template v-slot:item="{ item }">
                <div>
                  {{ item.title }}&nbsp;&nbsp;<strong>({{ item.isbn }})</strong>
                </div>
              </template>
            </va-autocomplete-input>
            <va-radio-group-input source="status" enum></va-radio-group-input>
            <va-rating-input source="rating"></va-rating-input>
            <va-text-input source="body" multiline></va-text-input>
            <va-text-input source="author"></va-text-input>
            <va-date-input
              source="publication_date"
              format="long"
            ></va-date-input>
          </v-col>
        </v-row>
      </v-card-text>
      <v-toolbar flat color="grey lighten-4">
        <va-save-button :saving="saving"></va-save-button>
      </v-toolbar>
    </v-card>
  </va-form>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      saving: false
    };
  }
};
</script>
