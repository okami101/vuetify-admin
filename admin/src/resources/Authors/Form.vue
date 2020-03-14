<template>
  <va-form :item="item" :saving.sync="saving">
    <v-card>
      <v-card-text>
        <v-row>
          <v-col sm="3">
            <va-file-input source="photo">
              <va-image-field
                source="photo"
                preview="thumbnails.medium"
                clearable
              ></va-image-field>
            </va-file-input>
            <va-text-input source="name"></va-text-input>
            <va-text-input source="description" multiline></va-text-input>
          </v-col>
          <v-col sm="4" offset="3">
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
