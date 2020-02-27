<template>
  <va-list
    :fields="[
      'id',
      {
        source: 'status',
        type: 'chip',
        options: { enum: true, color: v => $statusColor(v) }
      },
      { source: 'rating', type: 'rating' },
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
    </va-datagrid>
  </va-list>
</template>
