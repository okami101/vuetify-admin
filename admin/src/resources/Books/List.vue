<template>
  <v-card>
    <va-list
      :fields="[
        'id',
        'isbn',
        'category',
        'publisher_id',
        'publisher.id',
        'publisher.name',
        'title',
        'price',
        'commentable',
        'formats',
        'description',
        'publication_date',
        'description',
        'publication_date',
        'authors.id',
        'authors.name',
        'reviews.id',
        'reviews.name'
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
      :include="['publisher', 'authors']"
      flat
      v-slot="props"
      v-model="selected"
      :options.sync="options"
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
          'reviews',
          'authors'
        ]"
        show-expand
        v-bind="props"
        v-model="selected"
        :options.sync="options"
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
              <v-chip color="orange" :to="to">
                {{ item.name }}
              </v-chip>
            </template>
          </va-reference-field>
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
        <template v-slot:reviews="{ item }">
          <va-array-field source="reviews" :item="item" v-slot="{ items }">
            <va-single-field-list :items="items" v-slot="{ item }">
              <v-chip
                color="green"
                :to="{ name: 'reviews_show', params: { id: item.id } }"
                small
              >
                {{ item.author }}
              </v-chip>
            </va-single-field-list>
          </va-array-field>
        </template>
        <template v-slot:authors="{ item }">
          <va-array-field source="authors" :item="item" v-slot="{ items }">
            <va-single-field-list :items="items" v-slot="{ item }">
              <v-chip
                color="primary"
                :to="{ name: 'authors_show', params: { id: item.id } }"
                small
              >
                {{ item.name }}
              </v-chip>
            </va-single-field-list>
          </va-array-field>
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
