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
      filters: ["title", "author"],
      fields: [
        { source: "isbn", type: "text", sortable: true },
        { source: "title", type: "text", sortable: true },
        { source: "author", type: "text", sortable: true },
        { source: "publicationDate", type: "date", sortable: true },
        {
          source: "reviews",
          type: "reference-array",
          attributes: { reference: "reviews", itemText: "id", column: true },
        },
      ],
    };
  },
};
</script>
