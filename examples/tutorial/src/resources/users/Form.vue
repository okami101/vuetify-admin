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
            <va-text-input source="name"></va-text-input>
            <v-row>
              <v-col>
                <va-text-input source="username"></va-text-input>
              </v-col>
              <v-col>
                <va-text-input source="email"></va-text-input>
              </v-col>
            </v-row>
            <va-text-input source="address.street"></va-text-input>
            <v-row>
              <v-col>
                <va-text-input source="address.zipcode"></va-text-input>
              </v-col>
              <v-col>
                <va-text-input source="address.city"></va-text-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <va-text-input source="phone"></va-text-input>
              </v-col>
              <v-col>
                <va-text-input source="website"></va-text-input>
              </v-col>
            </v-row>
            <va-text-input source="company.name"></va-text-input>
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
