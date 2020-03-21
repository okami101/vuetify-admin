<template>
  <va-form :id="id" :item="item" :saving.sync="saving">
    <v-row justify="center">
      <v-col sm="6">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col lg="6">
                <va-file-input source="logo">
                  <va-image-field
                    source="logo"
                    src="thumbnails.medium"
                    contain
                    clearable
                  ></va-image-field>
                </va-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="6">
                <va-text-input source="name"></va-text-input>
              </v-col>
              <v-col sm="6">
                <va-select-input source="type" enum></va-select-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="6">
                <va-text-input source="founder"></va-text-input>
              </v-col>
              <v-col sm="6">
                <va-text-input source="headquarter"></va-text-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12">
                <va-text-input source="description" multiline></va-text-input>
                <va-file-input source="local" multiple>
                  <va-image-field
                    source="local"
                    src="thumbnails.medium"
                    lg="4"
                    clearable
                  ></va-image-field>
                </va-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="6">
                <va-text-input source="url"></va-text-input>
              </v-col>
              <v-col sm="6">
                <va-text-input source="email"></va-text-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="6">
                <va-text-input source="address.street"></va-text-input>
                <va-text-input source="address.postcode"></va-text-input>
                <va-text-input source="address.city"></va-text-input>
              </v-col>
              <v-col sm="6">
                <va-date-input
                  source="opening_date"
                  format="long"
                ></va-date-input>
                <va-boolean-input source="active"></va-boolean-input>
              </v-col>
            </v-row>
            <va-autocomplete-input
              v-if="$admin.can(['admin'])"
              source="users"
              model="user_ids"
              multiple
              reference="users"
              option-text="name"
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
      saving: false
    };
  }
};
</script>
