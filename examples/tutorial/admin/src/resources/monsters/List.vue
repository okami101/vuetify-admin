<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-data-iterator
      :filters="filters"
      :include="['media']"
      v-slot="props"
      v-model="selected"
      :options.sync="options"
    >
      <va-data-table
        :fields="fields"
        v-bind="props"
        v-model="selected"
        :options.sync="options"
      >
      </va-data-table>
    </va-data-iterator>
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
      options: {},
      selected: [],
    };
  },
};
</script>
