<template>
  <va-list
    :filters="[
      'q',
      'title',
      'author',
      { source: 'pricier_than', type: 'text' },
      { source: 'cheaper_than', type: 'text' },
      { source: 'published_before', type: 'date', format: 'long' },
      { source: 'published_after', type: 'date', format: 'long' }
    ]"
  >
    <template v-slot="props">
      <va-datagrid
        v-bind="props"
        :fields="[
          'id',
          'isbn',
          'title',
          'author',
          'price',
          { source: 'publication_date', type: 'date', format: 'long' }
        ]"
        row-click="show"
        show-expand
      >
        <template v-slot:actions-item="{ item }">
          <va-edit-button :item="item"></va-edit-button>
          <va-delete-button :item="item"></va-delete-button>
        </template>
        <template v-slot:expanded-item="{ item }">
          <va-rich-text-field
            :item="item"
            source="summary"
          ></va-rich-text-field>
        </template>
      </va-datagrid>
    </template>
  </va-list>
</template>
