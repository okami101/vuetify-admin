<template>
  <va-show>
    <v-row justify="center">
      <v-col sm="6">
        <v-card>
          <v-card-text>
            <va-field source="logo">
              <va-image-field
                source="logo"
                src="thumbnails.large"
                contain
              ></va-image-field>
            </va-field>
            <v-row>
              <v-col>
                <va-field source="name"></va-field>
                <va-field
                  source="type"
                  type="select"
                  :options="{ enum: true }"
                ></va-field>
              </v-col>
              <v-col>
                <va-field source="founder"></va-field>
                <va-field source="headquarter"></va-field>
              </v-col>
            </v-row>
            <va-field
              source="description"
              :options="{ multiline: true }"
            ></va-field>
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
                <va-field
                  source="opening_date"
                  type="date"
                  :options="{ format: 'long' }"
                ></va-field>
                <va-field
                  source="books_count"
                  type="number"
                  v-can="['admin']"
                ></va-field>
              </v-col>
            </v-row>
            <va-field source="local">
              <va-image-field
                source="local"
                src="thumbnails.medium"
              ></va-image-field>
            </va-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </va-show>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>
