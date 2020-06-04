<template>
  <va-show-layout :title="title">
    <va-show :item="item">
      <v-row justify="center">
        <v-col sm="4">
          <v-card>
            <v-card-text>
              <va-field source="body"></va-field>
              <va-field source="rating" type="rating"></va-field>
              <va-field source="author"></va-field>
              <va-field source="publicationDate" type="date"></va-field>
            </v-card-text>
          </v-card>
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
