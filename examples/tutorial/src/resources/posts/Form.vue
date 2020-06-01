<template>
  <va-form :id="id" :item="item" :saving.sync="saving">
    <v-row justify="center">
      <v-col sm="4">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2">
              {{ title }}
            </div>
          </template>
          <v-card-text>
            <va-autocomplete-input
              source="userId"
              reference="users"
            ></va-autocomplete-input>
            <va-text-input source="title"></va-text-input>
            <va-text-input source="body" multiline></va-text-input>
            <va-save-button :saving="saving"></va-save-button>
          </v-card-text>
        </base-material-card>
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
    };
  },
};
</script>
