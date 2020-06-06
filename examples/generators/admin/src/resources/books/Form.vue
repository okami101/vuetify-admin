<template>
  <va-form :id="id" :item="item">
    <v-row justify="center">
      <v-col sm="6">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2">
              {{ title }}
            </div>
          </template>
          <v-card-text>
            <va-text-input source="isbn"></va-text-input>
            <va-select-input source="category"></va-select-input>
            <va-text-input source="title"></va-text-input>
            <va-text-input source="description"></va-text-input>
            <va-text-input source="summary"></va-text-input>
            <va-text-input source="author"></va-text-input>
            <va-number-input source="price"></va-number-input>
            <va-boolean-input source="commentable"></va-boolean-input>
            <va-array-input source="formats"></va-array-input>
            <va-date-input source="publication_date"></va-date-input>
          </v-card-text>
          <va-save-button></va-save-button>
        </base-material-card>
      </v-col>
    </v-row>
  </va-form>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
