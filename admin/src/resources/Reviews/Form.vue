<template>
  <va-form :id="id" :item="item" :saving.sync="saving">
    <v-row justify="center">
      <v-col lg="6">
        <v-card>
          <v-card-text>
            <va-radio-group-input
              source="status"
              enum
              row
            ></va-radio-group-input>
            <v-row>
              <v-col lg="6">
                <va-autocomplete-input
                  source="book"
                  model="book_id"
                  option-text="title"
                  reference="books"
                  :fields="['title', 'isbn']"
                >
                  <template v-slot:item="{ item }">
                    <div>
                      {{ item.title }}&nbsp;&nbsp;<strong
                        >({{ item.isbn }})</strong
                      >
                    </div>
                  </template>
                </va-autocomplete-input>
                <va-rating-input source="rating"></va-rating-input>
              </v-col>
            </v-row>

            <va-text-input source="body" multiline></va-text-input>
            <v-row>
              <v-col>
                <va-text-input source="author"></va-text-input>
              </v-col>
              <v-col>
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
      </v-col>
    </v-row>
  </va-form>
</template>

<script>
export default {
  props: ["id", "item"],
  data() {
    return {
      saving: false
    };
  }
};
</script>
