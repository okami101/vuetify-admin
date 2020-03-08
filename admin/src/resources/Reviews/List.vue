<template>
  <v-card>
    <va-list
      :fields="[
        'id',
        'book_id',
        'status',
        'rating',
        'author',
        'body',
        'publication_date'
      ]"
      :filters="[
        'q',
        'book_id',
        { source: 'rating', type: 'rating' },
        {
          source: 'status',
          type: 'select',
          options: { enum: true, multiple: true }
        },
        'author',
        {
          source: 'published_before',
          type: 'date',
          options: { format: 'long' }
        },
        { source: 'published_after', type: 'date', options: { format: 'long' } }
      ]"
      :references="[
        {
          source: 'book_id',
          name: 'books',
          syncKey: 'reviews_book_list',
          fields: ['id', 'title']
        }
      ]"
      flat
      v-model="selected"
      :options.sync="options"
    >
      <template v-slot:filter.book_id="props">
        <va-autocomplete-input
          option-text="title"
          multiple
          reference="books"
          :fields="['id', 'title', 'isbn']"
          v-bind="props"
        >
          <template v-slot:item="{ item }">
            <div>
              {{ item.title }}&nbsp;&nbsp;<strong>({{ item.isbn }})</strong>
            </div>
          </template>
        </va-autocomplete-input>
      </template>
      <template v-slot="props">
        <va-datagrid
          :fields="[
            'id',
            {
              source: 'book_id',
              type: 'reference',
              options: {
                reference: 'books',
                syncKey: 'reviews_book_list',
                link: 'show',
                property: 'title'
              }
            },
            'status',
            { source: 'rating', type: 'rating' },
            'quality',
            'author',
            {
              source: 'publication_date',
              type: 'date',
              options: { format: 'long' }
            }
          ]"
          v-bind="props"
          show-expand
          v-model="selected"
          :options.sync="options"
        >
          <template v-slot:expanded-item="{ item }">
            {{ item.body }}
          </template>
          <template v-slot:quality="{ item }">
            {{ item.rating >= 3 ? $t("good") : $t("bad") }}
          </template>
          <template v-slot:status="{ item, value }">
            <v-chip :color="$statusColor(value)">
              <va-select-field
                source="status"
                :item="item"
                enum
              ></va-select-field>
            </v-chip>
          </template>
        </va-datagrid>
      </template>
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
