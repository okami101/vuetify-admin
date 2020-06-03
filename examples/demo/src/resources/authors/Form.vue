<template>
  <va-form :id="id" :item="item">
    <v-row justify="center">
      <v-col lg="6">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2">
              {{ title }}
            </div>
          </template>
          <v-card-text>
            <v-row>
              <v-col lg="6">
                <va-file-input source="photo" preview></va-file-input>
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
                ></va-autocomplete-input>
              </v-col>
            </v-row>
            <va-text-input source="description" multiline></va-text-input>
            <va-array-input
              source="backlinks"
              :label="$t('backlinks')"
              v-slot="props"
            >
              <v-row>
                <v-col sm="6">
                  <va-date-input v-bind="props" source="date"></va-date-input>
                </v-col>
                <v-col sm="6">
                  <va-text-input v-bind="props" source="url"></va-text-input>
                </v-col>
              </v-row>
            </va-array-input>
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
