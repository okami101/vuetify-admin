<template>
  <va-list
    :fields="[
      'id',
      'isbn',
      'category',
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
      'formats',
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
    v-slot="props"
  >
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
      <template v-slot:category="{ item }">
        <va-chip-field>
          <va-enum-field source="category" :item="item"></va-enum-field>
        </va-chip-field>
      </template>
      <template v-slot:formats="{ item }">
        <va-array-field source="formats" :item="item" v-slot="{ items }">
          <va-single-field-list :items="items" v-slot="{ item }">
            <va-chip-field color="yellow" small>
              <va-enum-field source="formats" :item="item"></va-enum-field>
            </va-chip-field>
          </va-single-field-list>
        </va-array-field>
      </template>
    </va-datagrid>
  </va-list>
</template>
