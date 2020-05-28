<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-data-iterator
      :filters="filters"
      :include="['monster']"
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
      options: {},
      selected: [],
    };
  },
};
</script>
