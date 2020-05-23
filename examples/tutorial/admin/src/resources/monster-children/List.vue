<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-data-iterator
      :filters="[
        {
          source: 'monster',
          type: 'autocomplete',
          reference: 'monsters',
          multiple: true,
        },
      ]"
      :include="['monster']"
      flat
      v-slot="props"
      v-model="selected"
      :options.sync="options"
    >
      <va-data-table
        :fields="[
          { source: 'monster', type: 'reference', reference: 'monsters' },
          'name',
          { source: 'created_at', type: 'date', format: 'long' },
          { source: 'updated_at', type: 'date', format: 'long' },
        ]"
        :sortable="['name', 'created_at', 'updated_at']"
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
      options: {},
      selected: [],
    };
  },
};
</script>
