<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-data-iterator
      :filters="[
        'name',
        'label',
        { source: 'active', type: 'boolean' },
        { source: 'level', type: 'number' },
        { source: 'rating', type: 'rating' },
        { source: 'category', type: 'select', multiple: true },
      ]"
      :include="['media']"
      flat
      v-slot="props"
      v-model="selected"
      :options.sync="options"
    >
      <va-data-table
        :fields="[
          'name',
          { source: 'email', type: 'email' },
          'label',
          { source: 'active', type: 'boolean' },
          { source: 'level', type: 'number' },
          { source: 'rating', type: 'rating' },
          { source: 'price', type: 'number', format: 'currency' },
          { source: 'category', type: 'select' },
          { source: 'publication_date', type: 'date', format: 'long' },
        ]"
        :sortable="[
          'name',
          'label',
          'level',
          'rating',
          'price',
          'publication_date',
          'created_at',
          'updated_at',
        ]"
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
