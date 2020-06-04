<template>
  <va-show-layout :title="title">
    <va-show :item="item">
      <v-row justify="center">
        <v-col sm="4">
          <v-card>
            <v-card-text>
              <va-field source="isbn" type="text"></va-field>
              <va-field source="title" type="text"></va-field>
              <va-field source="description" type="text"></va-field>
              <va-field source="author" type="text"></va-field>
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
