<template>
  <va-edit>
    <authors-form :item="item"></authors-form>
    <v-card>
      <va-list
        resource="books"
        disable-query-string
        :items-per-page="10"
        :fields="[
          'isbn',
          'category',
          'publisher_id',
          'publisher.name',
          'title',
          'price',
          'commentable',
          'publication_date',
          'description',
          'publication_date'
        ]"
        :filter="{
          authors: item.id
        }"
        :filters="[
          'q',
          'title',
          {
            source: 'publisher',
            type: 'select',
            options: {
              optionText: 'name',
              multiple: true,
              reference: 'publishers'
            }
          },
          { source: 'pricier_than', type: 'number' },
          { source: 'cheaper_than', type: 'number' },
          { source: 'commentable', type: 'boolean' },
          {
            source: 'published_before',
            type: 'date',
            options: { format: 'long' }
          },
          {
            source: 'published_after',
            type: 'date',
            options: { format: 'long' }
          }
        ]"
        :include="['publisher', 'media']"
        flat
        v-model="selected"
        :options.sync="options"
        v-slot="props"
      >
        <va-datagrid
          :fields="[
            { source: 'isbn', link: 'show' },
            'category',
            'publisher',
            'title',
            {
              source: 'price',
              type: 'number',
              options: { format: 'currency' }
            },
            { source: 'commentable', type: 'boolean' },
            {
              source: 'publication_date',
              type: 'date',
              options: { format: 'long' }
            }
          ]"
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
                resource="books"
                source="category"
                :item="item"
                enum
              ></va-select-field>
            </v-chip>
          </template>
        </va-datagrid>
      </va-list>
    </v-card>
  </va-edit>
</template>

<script>
import AuthorsForm from "./Form";

export default {
  props: {
    item: Object
  },
  components: {
    AuthorsForm
  },
  data() {
    return {
      options: {},
      selected: []
    };
  }
};
</script>
