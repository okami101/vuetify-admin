<template>
  <va-form :id="id" :item="item" :saving.sync="saving" v-model="model">
    <v-row justify="center">
      <v-col lg="8">
        <base-material-tabs-card
          :tabs="[
            { id: 'attributes', icon: 'mdi-eye' },
            { id: 'summary', icon: 'mdi-text' },
          ]"
        >
          <template v-slot:attributes>
            <v-row>
              <v-col>
                <va-select-input
                  source="publisher"
                  model="publisher_id"
                  reference="publishers"
                ></va-select-input>
                <va-text-input source="isbn"></va-text-input>
                <va-select-input source="category"></va-select-input>
                <va-text-input source="title"></va-text-input>
                <va-number-input
                  source="price"
                  format="currency"
                ></va-number-input>
              </v-col>
              <v-col>
                <va-select-input source="formats" multiple></va-select-input>
                <va-boolean-input source="commentable"></va-boolean-input>
                <va-date-input source="publication_date"></va-date-input>
                <va-autocomplete-input
                  v-if="$admin.can(['admin'])"
                  source="authors"
                  model="author_ids"
                  multiple
                  reference="authors"
                ></va-autocomplete-input>
                <va-autocomplete-input
                  source="tags"
                  multiple
                  taggable
                ></va-autocomplete-input>
              </v-col>
            </v-row>
            <va-text-input source="description" multiline></va-text-input>
          </template>
          <template v-slot:summary>
            <va-rich-text-input source="summary"></va-rich-text-input>
            <va-file-input source="extract"></va-file-input>
          </template>
          <template v-slot:footer>
            <va-save-button :saving="saving"></va-save-button>
          </template>
        </base-material-tabs-card>
      </v-col>
    </v-row>
  </va-form>
</template>

<script>
export default {
  props: ["id", "title", "item"],
  data() {
    return {
      saving: false,
      model: {},
    };
  },
};
</script>
