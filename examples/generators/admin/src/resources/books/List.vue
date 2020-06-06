<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list :filters="filters">
      <va-data-table :fields="fields"> </va-data-table>
    </va-list>
  </base-material-card>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      filters: ["title", "author"],
      fields: [
        { source: "isbn", sortable: true },
        { source: "title", sortable: true },
        "description",
        { source: "author", sortable: true },
        { source: "price", type: "number", sortable: true },
        { source: "publication_date", type: "date", sortable: true },
      ],
    };
  },
};
</script>
