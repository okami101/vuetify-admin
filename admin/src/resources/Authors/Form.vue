<template>
  <va-form :item="item" :saving.sync="saving">
    <v-row justify="center">
      <v-col lg="6">
        <v-card>
          <v-card-text>
            <va-file-input source="photo">
              <va-image-field
                source="photo"
                preview="thumbnails.medium"
                clearable
              ></va-image-field>
            </va-file-input>
            <va-text-input source="name"></va-text-input>
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
