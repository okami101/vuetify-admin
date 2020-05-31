<template>
  <div>
    <base-material-card :icon="resource.icon" :title="title">
      <va-data-iterator v-model="selected" :options.sync="options">
        <template v-slot="props">
          <va-data-table
            :fields="fields"
            v-bind="props"
            v-model="selected"
            :options.sync="options"
          >
          </va-data-table>
        </template>
      </va-data-iterator>
    </base-material-card>
  </div>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      fields: [
        { source: "id", sortable: true },
        { source: "name", sortable: true },
        { source: "username", sortable: true },
        { source: "email", type: "email" },
        { source: "address", type: "address" },
        "phone",
        { source: "website", type: "url" },
        "company.name",
      ],
      options: {},
      selected: [],
    };
  },
};
</script>
