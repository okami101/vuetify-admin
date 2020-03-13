<template>
  <v-card>
    <va-list
      :fields="[
        'isbn',
        'category',
        'publisher_id',
        'publisher.name',
        'title',
        'price',
        'commentable',
        'formats',
        'description',
        'publication_date',
        'description',
        'publication_date',
        'authors.name',
        'reviews.book_id',
        'reviews.author'
      ]"
      :filters="[
        'q',
        'title',
        { source: 'pricier_than', type: 'number' },
        { source: 'cheaper_than', type: 'number' },
        { source: 'commentable', type: 'boolean' },
        {
          source: 'published_before',
          type: 'date',
          options: { format: 'long' }
        },
        { source: 'published_after', type: 'date', options: { format: 'long' } }
      ]"
      :include="['publisher', 'authors', 'reviews']"
      flat
      v-slot="props"
      v-model="selected"
      :options.sync="options"
    >
      <va-datagrid
        :fields="[
          { source: 'isbn', link: 'show' },
          {
            source: 'cover',
            type: 'image',
            link: 'show',
            options: { preview: 'thumbnails.small' }
          },
          'category',
          'publisher',
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
          'authors',
          'reviews'
        ]"
        show-expand
        v-bind="props"
        v-model="selected"
        :options.sync="options"
      >
        <template v-slot:publisher="{ value }">
          <v-chip
            color="orange"
            :to="{ name: 'publishers_show', params: { id: value.id } }"
          >
            {{ value.name }}
          </v-chip>
        </template>
        <template v-slot:category="{ item }">
          <v-chip>
            <va-select-field
              source="category"
              :item="item"
              enum
            ></va-select-field>
          </v-chip>
        </template>
        <template v-slot:formats="{ item }">
          <va-array-field source="formats" :item="item" v-slot="{ items }">
            <va-single-field-list :items="items" v-slot="{ item }">
              <v-chip color="yellow" small>
                <va-select-field
                  source="formats"
                  :item="item"
                  enum
                ></va-select-field>
              </v-chip>
            </va-single-field-list>
          </va-array-field>
        </template>
        <template v-slot:authors="{ value }">
          <va-single-field-list :items="value" v-slot="{ item }">
            <v-chip
              color="primary"
              :to="{ name: 'authors_show', params: { id: item.id } }"
              small
            >
              {{ item.name }}
            </v-chip>
          </va-single-field-list>
        </template>
        <template v-slot:reviews="{ value }">
          <va-single-field-list :items="value" v-slot="{ item }" :limit="2">
            <v-chip
              color="green"
              :to="{ name: 'reviews_show', params: { id: item.id } }"
              small
            >
              {{ item.author }}
            </v-chip>
          </va-single-field-list>
        </template>
        <template v-slot:expanded-item="{ item }">
          {{ item.description }}
        </template>
      </va-datagrid>
    </va-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      options: {},
      selected: []
    };
  }
};
</script>
