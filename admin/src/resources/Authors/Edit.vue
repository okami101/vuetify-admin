<template>
  <va-edit>
    <authors-form :id="id" :item="item"></authors-form>
    <v-card>
      <va-list
        resource="books"
        disable-pagination
        hide-header
        :fields="[
          'isbn',
          'category',
          'title',
          'price',
          'commentable',
          'publication_date',
          'description',
          'publication_date',
        ]"
        :filter="{
          authors: id,
        }"
        :include="['publisher', 'reviews']"
        flat
        :options.sync="options"
        v-slot="props"
      >
        <va-datagrid
          disable-sort
          disable-select
          :fields="[
            { source: 'isbn', link: 'show' },
            'category',
            'title',
            {
              source: 'price',
              type: 'number',
              options: { format: 'currency' },
            },
            { source: 'commentable', type: 'boolean' },
            {
              source: 'publication_date',
              type: 'date',
              options: { format: 'long' },
            },
            'reviews',
          ]"
          v-bind="props"
          :options.sync="options"
        >
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
          <template v-slot:reviews="{ value }">
            <v-chip-group column>
              <v-chip
                color="green"
                small
                v-for="(item, i) in value"
                :key="i"
                :to="{ name: 'reviews_show', params: { id: item.id } }"
              >
                {{ item.author }}
              </v-chip>
            </v-chip-group>
          </template>
        </va-datagrid>
      </va-list>
    </v-card>
  </va-edit>
</template>

<script>
import AuthorsForm from "./Form";

export default {
  props: ["id", "item"],
  components: {
    AuthorsForm,
  },
  data() {
    return {
      options: {},
    };
  },
};
</script>
