<template>
  <va-form :id="id" :item="item" :saving.sync="saving">
    <v-row justify="center">
      <v-col sm="6">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2">
              {{ title }}
            </div>
          </template>
          <v-card-text>
            <va-autocomplete-input
              source="monster"
              reference="monsters"
              required
              model="monster_id"
            ></va-autocomplete-input>
            <va-text-input source="name" required></va-text-input>
          </v-card-text>
          <va-save-button :saving="saving"></va-save-button>
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
