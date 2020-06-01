<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-data-iterator
      :filters="filters"
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
          source: "userId",
          type: "select",
          alwaysOn: true,
          attributes: { reference: "users" },
        },
      ],
      fields: [
        {
          source: "user",
          type: "reference",
          attributes: { reference: "users", action: "edit", chip: true },
        },
        { source: "title", type: "text" },
        { source: "body", type: "text" },
      ],
      options: {},
      selected: [],
    };
  },
};
</script>
