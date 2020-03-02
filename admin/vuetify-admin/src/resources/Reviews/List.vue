<template>
  <va-list
    :fields="[
      'id',
      {
        source: 'book_id',
        type: 'reference',
        options: {
          reference: 'books',
          syncKey: 'reviews_list',
          link: 'show',
          property: 'title'
        }
      },
      {
        source: 'status',
        type: 'chip',
        options: { color: v => $statusColor(v) }
      },
      { source: 'rating', type: 'rating' },
      {
        source: 'quality',
        type: 'function',
        virtual: true,
        options: {
          render: ({ item, value }) =>
            item.rating >= 3 ? $t('good') : $t('bad')
        }
      },
      'author',
      { source: 'body', hidden: true },
      { source: 'publication_date', type: 'date', options: { format: 'long' } }
    ]"
    :filters="[
      'q',
      {
        source: 'book_id',
        type: 'autocomplete',
        options: { optionText: 'title', multiple: true },
        reference: { resource: 'books', fields: ['id', 'title', 'isbn'] }
      },
      { source: 'rating', type: 'rating' },
      {
        source: 'status',
        type: 'select',
        options: { enum: true, multiple: true }
      },
      'author',
      { source: 'published_before', type: 'date', options: { format: 'long' } },
      { source: 'published_after', type: 'date', options: { format: 'long' } }
    ]"
    v-slot="props"
  >
    <va-datagrid v-bind="props" show-expand>
      <template v-slot:expanded-item="{ item }">
        <va-text-field :item="item" source="body"></va-text-field>
      </template>
      <template v-slot:status="{ item }">
        <va-select-field source="status" :item="item" enum></va-select-field>
      </template>
    </va-datagrid>
  </va-list>
</template>
