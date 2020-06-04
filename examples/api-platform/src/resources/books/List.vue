<template>
  <v-card>
    <v-card-title>
      <h1 class="display-1">
        {{ title }}
      </h1>
    </v-card-title>
    <v-card-text>
      <va-list>
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
      fields: [
        { source: "isbn", type: "text" },
        { source: "title", type: "text" },
        { source: "description", type: "text" },
        { source: "author", type: "text" },
        { source: "publicationDate", type: "date" },
      ],
    };
  },
};
</script>
