<template>
  <va-edit>
    <authors-form :id="id" :title="title" :item="item"></authors-form>
    <base-material-card
      icon="mdi-book"
      :title="$tc('resources.books.name', 10)"
    >
      <va-list
        resource="books"
        disable-pagination
        disable-query-string
        hide-header
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
            { source: 'category', type: 'select', chip: true },
            'title',
            {
              source: 'price',
              type: 'number',
              format: 'currency',
            },
            { source: 'commentable', type: 'boolean' },
            {
              source: 'publication_date',
              type: 'date',
              format: 'long',
            },
            'reviews',
          ]"
          v-bind="props"
          :options.sync="options"
        >
          <template v-slot:reviews="{ value }">
            <v-chip-group column>
              <va-reference-field
                reference="reviews"
                v-for="(item, i) in value"
                :key="i"
                color="green"
                small
                chip
                :item="item"
                option-text="author"
              >
              </va-reference-field>
            </v-chip-group>
          </template>
        </va-datagrid>
      </va-list>
    </base-material-card>
  </va-edit>
</template>

<script>
export default {
  props: ["id", "title", "item"],
  data() {
    return {
      options: {},
    };
  },
};
</script>
