<template>
  <va-show-layout>
    <va-show :item="item">
      <v-row justify="center">
        <v-col sm="4">
          <base-material-card>
            <template v-slot:heading>
              <div class="display-2">
                {{ title }}
              </div>
            </template>
            <v-card-text>
              <va-field source="name"></va-field>
              <va-field source="username"></va-field>
              <va-field source="email"></va-field>
              <va-field source="address" type="address"></va-field>
              <va-field source="phone"></va-field>
              <va-field source="website" type="url"></va-field>
              <va-field source="company.name"></va-field>
            </v-card-text>
          </base-material-card>
        </v-col>
      </v-row>
    </va-show>
  </va-show-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
