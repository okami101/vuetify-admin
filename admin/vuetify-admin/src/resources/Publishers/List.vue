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
    v-slot="props"
  >
    <va-datagrid
      :fields="[
        'id',
        {
          source: 'logo',
          type: 'resource-link'
        },
        { source: 'name', type: 'resource-link' },
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
    >
      <template v-slot:logo="{ item }">
        <va-image-field
          :item="item"
          source="logo"
          preview="thumbnails.small"
        ></va-image-field>
      </template>
    </va-datagrid>
  </va-list>
</template>
