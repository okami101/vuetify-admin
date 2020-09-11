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
      filters: [
        {
          source: "product_id",
          type: "autocomplete",
          attributes: {
            optionText: "reference",
            multiple: true,
            reference: "products",
          },
        },
        { source: "rating", type: "rating" },
        {
          source: "status",
          type: "select",
          attributes: {
            multiple: true,
          },
        },
        {
          source: "date_lte",
          type: "date",
        },
        {
          source: "date_gte",
          type: "date",
        },
      ],
      fields: [
        {
          source: "status",
          type: "select",
          attributes: {
            chip: true,
            color: (v) => this.$statusColor(v),
          },
        },
        { source: "rating", type: "rating", sortable: true },
        {
          source: "date",
          type: "date",
          sortable: true,
        },
        "comment",
      ],
    };
  },
};
</script>
