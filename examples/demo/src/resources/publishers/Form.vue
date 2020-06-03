<template>
  <va-form :id="id" :item="item">
    <v-row justify="center">
      <v-col sm="6">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2">
              {{ title }}
            </div>
          </template>
          <v-card-text>
            <v-row>
              <v-col lg="6">
                <va-file-input
                  source="logo"
                  preview
                  src="thumbnails.medium"
                  contain
                ></va-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="6">
                <va-text-input source="name"></va-text-input>
              </v-col>
              <v-col sm="6">
                <va-select-input source="type"></va-select-input>
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
                <va-file-input
                  source="local"
                  preview
                  multiple
                  src="thumbnails.medium"
                  lg="4"
                >
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
                <va-date-input source="opening_date"></va-date-input>
                <va-boolean-input source="active"></va-boolean-input>
              </v-col>
            </v-row>
            <va-autocomplete-input
              v-if="$admin.can(['admin'])"
              source="users"
              model="user_ids"
              multiple
              reference="users"
            ></va-autocomplete-input>
          </v-card-text>
          <va-save-button></va-save-button>
        </base-material-card>
      </v-col>
    </v-row>
  </va-form>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
