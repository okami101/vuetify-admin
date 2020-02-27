<template>
  <va-list
    :fields="[
      'id',
      'isbn',
      {
        source: 'category',
        type: 'enum',
        options: { chip: true }
      },
      { source: 'publisher_id', hidden: true },
      { source: 'publisher.id', hidden: true },
      'publisher.name',
      'title',
      'author',
      {
        source: 'price',
        type: 'number',
        options: { format: 'currency' }
      },
      { source: 'commentable', type: 'boolean', editable: true },
      {
        source: 'formats',
        type: 'enum',
        multiple: true,
        options: { chip: true, small: true, color: 'warning' }
      },
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
    :include="['publisher', 'reviews']"
  >
    <template v-slot="props">
      <va-datagrid v-bind="props" show-expand>
        <template v-slot:isbn="{ item, value }">
          <router-link
            :to="{
              name: 'books_show',
              params: { id: item.id }
            }"
            >{{ value }}</router-link
          >
        </template>
        <template v-slot:publisher.name="{ item, value }">
          <router-link
            :to="{
              name: 'publishers_show',
              params: { id: item.publisher_id }
            }"
            >{{ value }}</router-link
          >
        </template>
        <template v-slot:expanded-item="{ item }">
          <va-text-field :item="item" source="description"></va-text-field>
        </template>
      </va-datagrid>
    </template>
  </va-list>
</template>
