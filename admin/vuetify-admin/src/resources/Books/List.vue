<template>
  <va-list
    :fields="[
      'id',
      'isbn',
      'title',
      'author',
      {
        source: 'price',
        type: 'number',
        options: { format: 'currency' }
      },
      { source: 'commentable', type: 'boolean', editable: true },
      { source: 'description', hidden: true },
      { source: 'publication_date', type: 'date', options: { format: 'long' } }
    ]"
    :filters="[
      'q',
      'title',
      'author',
      { source: 'pricier_than', type: 'number' },
      { source: 'cheaper_than', type: 'number' },
      { source: 'commentable', type: 'boolean' },
      { source: 'published_before', type: 'date', options: { format: 'long' } },
      { source: 'published_after', type: 'date', options: { format: 'long' } }
    ]"
  >
    <template v-slot="props">
      <va-datagrid v-bind="props" row-click="show" show-expand>
        <template v-slot:actions-item="{ item }">
          <va-edit-button :item="item"></va-edit-button>
          <va-delete-button :item="item"></va-delete-button>
        </template>
        <template v-slot:expanded-item="{ item }">
          <va-rich-text-field
            :item="item"
            source="description"
          ></va-rich-text-field>
        </template>
      </va-datagrid>
    </template>
  </va-list>
</template>
