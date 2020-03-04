<template>
  <va-list
    :references="[
      {
        source: 'publisher_id',
        name: 'publishers',
        syncKey: 'books_publisher_list',
        fields: ['id', 'name']
      },
      {
        source: 'review_ids',
        name: 'reviews',
        multiple: true,
        reference: 'reviews',
        syncKey: 'books_reviews_list',
        fields: ['id', 'author']
      }
    ]"
    :fields="[
      'id',
      'isbn',
      'category',
      'publisher_id',
      'title',
      'price',
      'commentable',
      'formats',
      'description',
      'publication_date'
    ]"
    :filters="[
      'q',
      'title',
      { source: 'pricier_than', type: 'number' },
      { source: 'cheaper_than', type: 'number' },
      { source: 'commentable', type: 'boolean' },
      { source: 'published_before', type: 'date', options: { format: 'long' } },
      { source: 'published_after', type: 'date', options: { format: 'long' } }
    ]"
    :include="['reviews']"
    v-slot="props"
  >
    <va-datagrid
      :fields="[
        'id',
        { source: 'isbn', link: 'show' },
        {
          source: 'cover',
          type: 'image',
          link: 'show',
          options: { preview: 'thumbnails.small' }
        },
        'category',
        'publisher_id',
        'title',
        {
          source: 'price',
          type: 'number',
          options: { format: 'currency' }
        },
        { source: 'commentable', type: 'boolean', editable: true },
        'formats',
        {
          source: 'publication_date',
          type: 'date',
          options: { format: 'long' }
        },
        'review_ids'
      ]"
      v-bind="props"
      show-expand
    >
      <template v-slot:publisher_id="{ item }">
        <va-reference-field
          source="publisher_id"
          :item="item"
          reference="publishers"
          sync-key="books_publisher_list"
          link="show"
          property="name"
        >
          <template v-slot="{ item, to }">
            <va-chip-field color="orange" :to="to">
              {{ item.name }}
            </va-chip-field>
          </template>
        </va-reference-field>
      </template>
      <template v-slot:category="{ item }">
        <va-chip-field>
          <va-select-field
            source="category"
            :item="item"
            enum
          ></va-select-field>
        </va-chip-field>
      </template>
      <template v-slot:formats="{ item }">
        <va-array-field source="formats" :item="item">
          <va-single-field-list v-slot="{ item }">
            <va-chip-field color="yellow" small>
              <va-select-field
                source="formats"
                :item="item"
                enum
              ></va-select-field>
            </va-chip-field>
          </va-single-field-list>
        </va-array-field>
      </template>
      <template v-slot:review_ids="{ item }">
        <va-reference-field
          source="review_ids"
          :item="item"
          multiple
          reference="reviews"
          sync-key="books_reviews_list"
          link="show"
          property="author"
          v-slot="{ items, link }"
        >
          <va-single-field-list :items="items" v-slot="{ item }" :limit="2">
            <va-chip-field
              color="green"
              :to="{ name: link, params: { id: item.id } }"
              small
            >
              {{ item.author }}
            </va-chip-field>
          </va-single-field-list>
        </va-reference-field>
      </template>
      <template v-slot:expanded-item="{ item }">
        <va-text-field :item="item" source="description"></va-text-field>
      </template>
    </va-datagrid>
  </va-list>
</template>
