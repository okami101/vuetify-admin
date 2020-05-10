<template>
  <va-edit>
    <publishers-form :id="id" :title="title" :item="item"></publishers-form>
    <base-material-card
      icon="mdi-book"
      :title="$tc('resources.books.name', 10)"
    >
      <va-list
        resource="books"
        disable-query-string
        :items-per-page="10"
        :filter="{
          publisher: id,
        }"
        :filters="[
          'q',
          'title',
          {
            source: 'authors',
            type: 'autocomplete',
            optionText: 'name',
            multiple: true,
            reference: 'authors',
          },
          { source: 'pricier_than', type: 'number' },
          { source: 'cheaper_than', type: 'number' },
          { source: 'commentable', type: 'boolean' },
          {
            source: 'published_before',
            type: 'date',
            format: 'long',
          },
          {
            source: 'published_after',
            type: 'date',
            format: 'long',
          },
        ]"
        :include="['authors']"
        flat
        v-model="selected"
        :options.sync="options"
        v-slot="props"
      >
        <va-datagrid
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
            'authors',
          ]"
          v-bind="props"
          v-model="selected"
          :options.sync="options"
        >
          <template v-slot:authors="{ value }">
            <v-chip-group column>
              <va-reference-field
                reference="authors"
                v-for="(item, i) in value"
                :key="i"
                color="primary"
                small
                chip
                :item="item"
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
      selected: [],
    };
  },
};
</script>
