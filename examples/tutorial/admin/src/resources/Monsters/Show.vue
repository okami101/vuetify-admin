<template>
  <va-show>
    <v-row justify="center">
      <v-col sm="6">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2">
              {{ title }}
            </div>
          </template>
          <v-card-text>
            <va-field source="name" type="text"></va-field>
            <va-field source="email" type="email"></va-field>
            <va-field source="label" type="text"></va-field>
            <va-field source="active" type="boolean"></va-field>
            <va-field source="level" type="number"></va-field>
            <va-field source="rating" type="rating"></va-field>
            <va-field source="price" type="number" format="currency"></va-field>
            <va-field source="description" type="text"></va-field>
            <va-field source="body" type="rich-text"></va-field>
            <va-field source="category" type="select"></va-field>
            <va-field source="tags" type="array"></va-field>
            <va-field
              source="publication_date"
              type="date"
              format="long"
            ></va-field>
            <va-field source="avatar" type="image"></va-field>
            <va-field source="images" type="image"></va-field>
            <va-field source="files" type="file"></va-field>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </va-show>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
