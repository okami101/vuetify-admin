<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list
      :filters="[
        'q',
        'name',
        'founder',
        'headquarter',
        { source: 'active', type: 'boolean' },
      ]"
      :include="['media', 'books_count']"
      v-slot="props"
      v-model="selected"
      :options.sync="options"
    >
      <va-datagrid
        :fields="[
          {
            source: 'logo',
            type: 'image',
            link: 'show',
            src: 'thumbnails.small',
            contain: true,
          },
          { source: 'name', link: 'show' },
          { source: 'type', type: 'select' },
          'founder',
          'headquarter',
          { source: 'url', type: 'url' },
          { source: 'active', type: 'boolean' },
          'address.street',
          {
            source: 'address',
            label: $t('address'),
          },
          { source: 'opening_date', type: 'date', format: 'long' },
          { source: 'books_count', type: 'number' },
        ]"
        :sortable="[
          'name',
          'founder',
          'headquarter',
          'opening_date',
          'books_count',
        ]"
        v-bind="props"
        v-model="selected"
        :options.sync="options"
      >
        <template v-slot:address="{ value }">
          {{ value.postcode }} {{ value.city }}
        </template>
      </va-datagrid>
    </va-list>
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
