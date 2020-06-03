<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list :filters="filters" :include="['media']">
      <va-data-table :fields="fields"> </va-data-table>
    </va-list>
  </base-material-card>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      filters: [
        "name",
        "label",
        { source: "active", type: "boolean" },
        { source: "level", type: "number" },
        { source: "rating", type: "rating" },
        {
          source: "category",
          type: "select",
          attributes: { multiple: true },
        },
      ],
      fields: [
        "name",
        { source: "email", type: "email" },
        "label",
        { source: "active", type: "boolean" },
        { source: "level", type: "number", sortable: true },
        { source: "rating", type: "rating", sortable: true },
        {
          source: "price",
          type: "number",
          sortable: true,
          attributes: { format: "currency" },
        },
        { source: "category", type: "select" },
        { source: "publication_date", type: "date", sortable: true },
      ],
    };
  },
};
</script>
