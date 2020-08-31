<template>
  <va-form :id="id" :item="item">
    <v-row justify="center">
      <v-col sm="6">
        <v-card>
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
            <va-save-button></va-save-button>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </va-form>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
