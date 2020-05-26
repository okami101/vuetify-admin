<template>
  <va-show-layout>
    <va-show :item="item">
      <v-row justify="center">
        <v-col sm="6">
          <base-material-card>
            <template v-slot:heading>
              <div class="display-2">
                {{ title }}
              </div>
            </template>
            <v-card-text>
              <va-field
                source="logo"
                type="image"
                src="thumbnails.large"
                contain
              ></va-field>
              <v-row>
                <v-col>
                  <va-field source="name"></va-field>
                  <va-field source="type" type="select"></va-field>
                </v-col>
                <v-col>
                  <va-field source="founder"></va-field>
                  <va-field source="headquarter"></va-field>
                </v-col>
              </v-row>
              <va-field source="description"></va-field>
              <v-row>
                <v-col lg="6">
                  <va-field source="url" type="url"></va-field>
                  <va-field source="email" type="email"></va-field>
                  <va-field source="active" type="boolean"></va-field>
                </v-col>
                <v-col lg="6">
                  <va-field
                    source="address"
                    :label="$t('address')"
                    v-slot="{ value }"
                  >
                    {{ value.street }}, {{ value.postcode }} {{ value.city }}
                  </va-field>
                  <va-field source="opening_date" type="date"></va-field>
                  <va-field source="books_count" type="number"></va-field>
                </v-col>
              </v-row>
              <va-field
                source="local"
                type="image"
                src="thumbnails.medium"
                lg="4"
              ></va-field>
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
