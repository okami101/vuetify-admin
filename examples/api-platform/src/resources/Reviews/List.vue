<template>
  <v-card>
    <v-card-title>
      <h1 class="display-1">
        {{ title }}
      </h1>
    </v-card-title>
    <v-card-text>
      <va-list :filters="filters">
        <va-data-table :fields="fields"></va-data-table>
      </va-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      filters: [
        {
          source: "book",
          type: "autocomplete",
          attributes: { reference: "books", searchQuery: "title" },
        },
      ],
      fields: [
        {
          source: "book",
          type: "reference",
          attributes: { reference: "books" },
        },
        { source: "body", type: "text" },
        { source: "rating", type: "rating" },
        { source: "author", type: "text" },
        { source: "publicationDate", type: "date" },
      ],
    };
  },
};
</script>
