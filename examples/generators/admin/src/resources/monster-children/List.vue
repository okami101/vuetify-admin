<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list :filters="filters" :include="['monster']">
      <va-data-table :fields="fields"></va-data-table>
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
          source: "monster",
          type: "autocomplete",
          attributes: { reference: "monsters", multiple: true },
        },
      ],
      fields: [
        {
          source: "monster",
          type: "reference",
          attributes: { reference: "monsters" },
        },
        "name",
        { source: "created_at", type: "date", sortable: true },
        { source: "updated_at", type: "date", sortable: true },
      ],
    };
  },
};
</script>
