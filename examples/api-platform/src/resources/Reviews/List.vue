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
        "body",
        { source: "rating", type: "rating" },
        "author",
        { source: "publicationDate", type: "date", sortable: true },
      ],
    };
  },
};
</script>
