<template>
  <va-simple-form :resource="resource" :item="item">
    <v-row>
      <v-col sm="3">
        <va-rating-input source="rating"></va-rating-input>
        <va-text-input source="body" multiline></va-text-input>
        <va-text-input source="author"></va-text-input>
        <va-date-input source="publication_date" format="long"></va-date-input>
      </v-col>
    </v-row>
  </va-simple-form>
</template>

<script>
export default {
  props: ["resource", "item"]
};
</script>
