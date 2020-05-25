<template>
  <va-show-layout>
    <va-show :item="item">
      <v-row justify="center">
        <v-col lg="4">
          <base-material-card>
            <template v-slot:heading>
              <div class="display-2">
                {{ title }}
              </div>
            </template>
            <v-card-text>
              <va-field
                source="book"
                type="reference"
                reference="books"
              ></va-field>
              <va-field
                source="status"
                type="select"
                chip
                :color="$statusColor"
              ></va-field>
              <va-field source="quality" v-if="item">
                {{ item.rating >= 3 ? $t("good") : $t("bad") }}
              </va-field>
              <va-field source="rating" type="rating"></va-field>
              <va-field source="body"></va-field>
              <va-field source="author"></va-field>
              <va-field source="publication_date" type="date"></va-field>
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
