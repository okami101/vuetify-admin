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
              <va-field source="isbn"></va-field>
              <va-field source="category" type="select" chip></va-field>
              <va-field source="title"></va-field>
              <va-field source="description"></va-field>
              <va-field source="summary" type="rich-text"></va-field>
              <va-field source="author"></va-field>
              <va-field
                source="price"
                type="number"
                format="currency"
              ></va-field>
              <va-field source="commentable" type="boolean"></va-field>
              <va-field source="formats" type="array" select></va-field>
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
