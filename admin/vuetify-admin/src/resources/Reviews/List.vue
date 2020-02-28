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
      'status',
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
      { source: 'publication_date', type: 'date', options: { format: 'long' } }
    ]"
    :filters="[
      'q',
      { source: 'rating', type: 'rating' },
      'author',
      { source: 'published_before', type: 'date', options: { format: 'long' } },
      { source: 'published_after', type: 'date', options: { format: 'long' } }
    ]"
    :include="['book']"
    v-slot="props"
  >
    <va-datagrid v-bind="props" show-expand>
      <template v-slot:expanded-item="{ item }">
        <va-text-field :item="item" source="body"></va-text-field>
      </template>
      <template v-slot:status="{ item, value }">
        <va-chip-field :color="$statusColor(value)">
          <va-select-field source="status" :item="item"></va-select-field>
        </va-chip-field>
      </template>
    </va-datagrid>
  </va-list>
</template>
