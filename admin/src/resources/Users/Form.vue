<template>
  <va-form :id="id" :item="item" :saving.sync="saving">
    <v-row justify="center">
      <v-col lg="3">
        <v-card>
          <v-card-text>
            <va-text-input source="name"></va-text-input>
            <va-text-input source="email" type="email"></va-text-input>
            <va-boolean-input source="active"></va-boolean-input>
            <va-select-input
              source="roles"
              enum
              multiple
              v-model="roles"
            ></va-select-input>
            <va-autocomplete-input
              source="publishers"
              model="publisher_ids"
              multiple
              reference="publishers"
              option-text="name"
              v-if="roles.includes('editor')"
            ></va-autocomplete-input>
            <va-autocomplete-input
              source="authors"
              model="author_ids"
              multiple
              reference="authors"
              option-text="name"
              v-if="roles.includes('author')"
            ></va-autocomplete-input>
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
      roles: [],
      saving: false
    };
  }
};
</script>
