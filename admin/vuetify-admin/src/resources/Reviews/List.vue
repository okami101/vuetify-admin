<template>
  <va-list
    :filters="[
      'q',
      'rating',
      'author',
      { source: 'published_before', type: 'date' },
      { source: 'published_after', type: 'date' }
    ]"
  >
    <template v-slot="props">
      <va-datagrid
        v-bind="props"
        :fields="['id', 'rating', 'author', 'publication_date']"
        row-click="show"
        show-expand
      >
        <template v-slot:rating="{ item }">
          <va-rating-field :item="item" source="rating"></va-rating-field>
        </template>
        <template v-slot:row-actions="{ item }">
          <va-edit-button :item="item"></va-edit-button>
          <va-delete-button :item="item"></va-delete-button>
        </template>
        <template v-slot:expanded-item="{ item }">
          <va-text-field :item="item" source="body"></va-text-field>
        </template>
      </va-datagrid>
    </template>
  </va-list>
</template>
