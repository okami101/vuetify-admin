<template>
  <va-edit>
    <publishers-form :id="id" :item="item"></publishers-form>
    <v-card>
      <va-list
        resource="books"
        disable-query-string
        :items-per-page="10"
        :fields="[
          'isbn',
          'category',
          'title',
          'price',
          'commentable',
          'publication_date',
          'description',
          'publication_date',
          'authors.name'
        ]"
        :filter="{
          publisher: id
        }"
        :filters="[
          'q',
          'title',
          {
            source: 'authors',
            type: 'autocomplete',
            options: {
              optionText: 'name',
              multiple: true,
              reference: 'authors'
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
        :include="['authors']"
        flat
        v-model="selected"
        :options.sync="options"
        v-slot="props"
      >
        <va-datagrid
          :fields="[
            { source: 'isbn', link: 'show' },
            'category',
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
            },
            'authors'
          ]"
          v-bind="props"
          v-model="selected"
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
          <template v-slot:authors="{ value }">
            <v-chip-group column>
              <v-chip
                color="primary"
                small
                v-for="(item, i) in value"
                :key="i"
                :to="{ name: 'authors_show', params: { id: item.id } }"
              >
                {{ item.name }}
              </v-chip>
            </v-chip-group>
          </template>
        </va-datagrid>
      </va-list>
    </v-card>
  </va-edit>
</template>

<script>
import PublishersForm from "./Form";

export default {
  props: ["id", "item"],
  components: {
    PublishersForm
  },
  data() {
    return {
      options: {},
      selected: []
    };
  }
};
</script>
