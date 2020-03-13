<template>
  <v-card>
    <va-list
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
        {
          source: 'published_before',
          type: 'date',
          options: { format: 'long' }
        },
        { source: 'published_after', type: 'date', options: { format: 'long' } }
      ]"
      :include="['authors', 'reviews']"
      :references="[
        {
          source: 'publisher_id',
          name: 'publishers',
          syncKey: 'books_publisher_list'
        },
        {
          source: 'author_ids',
          name: 'authors',
          multiple: true,
          reference: 'authors',
          syncKey: 'books_authors_list'
        },
        {
          source: 'review_ids',
          name: 'reviews',
          multiple: true,
          reference: 'reviews',
          syncKey: 'books_reviews_list'
        }
      ]"
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
          'review_ids',
          'author_ids'
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
              <v-chip
                color="green"
                :to="{ name: link, params: { id: item.id } }"
                small
              >
                {{ item.author }}
              </v-chip>
            </va-single-field-list>
          </va-reference-field>
        </template>
        <template v-slot:author_ids="{ item }">
          <va-reference-field
            source="author_ids"
            :item="item"
            multiple
            reference="authors"
            sync-key="books_authors_list"
            link="show"
            property="name"
            v-slot="{ items, link }"
          >
            <va-single-field-list :items="items" v-slot="{ item }">
              <v-chip
                color="primary"
                :to="{ name: link, params: { id: item.id } }"
                small
              >
                {{ item.name }}
              </v-chip>
            </va-single-field-list>
          </va-reference-field>
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
