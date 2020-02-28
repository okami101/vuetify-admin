<template>
  <va-list
    :fields="[
      'id',
      'isbn',
      { source: 'category', type: 'chip' },
      {
        source: 'publisher_id',
        type: 'reference',
        options: {
          reference: 'publishers',
          syncKey: 'books_list',
          link: 'show',
          property: 'name'
        }
      },
      'title',
      'author',
      {
        source: 'price',
        type: 'number',
        options: { format: 'currency' }
      },
      { source: 'commentable', type: 'boolean', editable: true },
      { source: 'formats', type: 'array' },
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
    :include="['reviews']"
    v-slot="props"
  >
    <va-datagrid v-bind="props" show-expand>
      <template v-slot:cell.isbn="{ item, value }">
        <router-link
          :to="{
            name: 'books_show',
            params: { id: item.id }
          }"
          >{{ value }}</router-link
        >
      </template>
      <template v-slot:publisher_id="{ item, to }">
        <va-chip-field color="orange" :to="to">
          {{ item.name }}
        </va-chip-field>
      </template>
      <template v-slot:category="{ item }">
        <va-enum-field source="category" :item="item"></va-enum-field>
      </template>
      <template v-slot:formats="{ items }">
        <va-single-field-list :items="items" v-slot="{ item }">
          <va-chip-field color="yellow" small>
            <va-enum-field source="formats" :item="item"></va-enum-field>
          </va-chip-field>
        </va-single-field-list>
      </template>
      <template v-slot:expanded-item="{ item }">
        <va-text-field :item="item" source="description"></va-text-field>
      </template>
    </va-datagrid>
  </va-list>
</template>
