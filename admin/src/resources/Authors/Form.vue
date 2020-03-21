<template>
  <va-form :id="id" :item="item" :saving.sync="saving">
    <v-row justify="center">
      <v-col lg="6">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col lg="6">
                <va-file-input source="photo">
                  <va-image-field
                    source="photo"
                    src="thumbnails.medium"
                    clearable
                  ></va-image-field>
                </va-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <va-text-input source="name"></va-text-input>
              </v-col>
              <v-col>
                <va-autocomplete-input
                  v-if="$admin.can(['admin'])"
                  source="users"
                  model="user_ids"
                  multiple
                  reference="users"
                  option-text="name"
                ></va-autocomplete-input>
              </v-col>
            </v-row>
            <va-text-input source="description" multiline></va-text-input>
            <va-array-input
              source="backlinks"
              tracked-by="date"
              :label="$t('backlinks')"
              v-slot="props"
            >
              <v-row>
                <v-col sm="6">
                  <va-date-input
                    v-bind="props"
                    source="date"
                    format="long"
                  ></va-date-input>
                </v-col>
                <v-col sm="6">
                  <va-text-input v-bind="props" source="url"></va-text-input>
                </v-col>
              </v-row>
            </va-array-input>
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
