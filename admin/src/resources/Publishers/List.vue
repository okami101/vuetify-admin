<template>
  <va-list
    :fields="[
      'id',
      'name',
      'type',
      'founder',
      'headquarter',
      'url',
      'active',
      'address',
      'opening_date'
    ]"
    :filters="[
      'q',
      'name',
      'founder',
      'headquarter',
      { source: 'active', type: 'boolean' }
    ]"
    :include="['books_count']"
    v-model="selected"
    :options.sync="options"
    v-slot="props"
  >
    <va-datagrid
      :fields="[
        'id',
        {
          source: 'logo',
          type: 'image',
          link: 'show',
          options: { preview: 'thumbnails.small' }
        },
        { source: 'name', link: 'show' },
        { source: 'type', type: 'select', options: { enum: true } },
        'founder',
        'headquarter',
        { source: 'url', type: 'url' },
        { source: 'email', type: 'email' },
        { source: 'active', type: 'boolean' },
        {
          source: 'address.street'
        },
        {
          source: 'address',
          label: $t('address'),
          type: 'function',
          options: {
            render: ({ value }) => `${value.postcode} ${value.city} `
          }
        },
        { source: 'opening_date', type: 'date', options: { format: 'long' } },
        { source: 'books_count', type: 'number' }
      ]"
      v-bind="props"
      v-model="selected"
      :options.sync="options"
    >
    </va-datagrid>
  </va-list>
</template>

<script>
export default {
  data() {
    return {
      options: {},
      selected: []
    };
  }
};
</script>
