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
      ]"
      :filters="[
        'q',
        'title',
        {
          source: 'publisher',
          type: 'select',
          options: {
            optionText: 'name',
            multiple: true,
            reference: 'publishers',
          },
        },
        {
          source: 'authors',
          type: 'autocomplete',
          options: {
            optionText: 'name',
            multiple: true,
            reference: 'authors',
          },
        },
        { source: 'pricier_than', type: 'number' },
        { source: 'cheaper_than', type: 'number' },
        { source: 'commentable', type: 'boolean' },
        {
          source: 'published_before',
          type: 'date',
          options: { format: 'long' },
        },
        {
          source: 'published_after',
          type: 'date',
          options: { format: 'long' },
        },
      ]"
      :include="['publisher', 'authors', 'media']"
      flat
      v-model="selected"
      :options.sync="options"
      v-slot="props"
    >
      <va-datagrid
        :fields="[
          { source: 'isbn', link: 'show' },
          {
            source: 'cover',
            type: 'image',
            link: 'show',
            options: { src: 'thumbnails.small' },
          },
          'category',
          'publisher',
          'title',
          {
            source: 'price',
            type: 'number',
            options: { format: 'currency' },
          },
          { source: 'commentable', type: 'boolean', editable: true },
          'formats',
          {
            source: 'publication_date',
            type: 'date',
            options: { format: 'long' },
          },
          'authors',
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
        <template v-slot:formats="{ value }">
          <v-chip-group column>
            <v-chip color="yellow" small v-for="(item, i) in value" :key="i">
              <va-select-field
                source="formats"
                :item="item"
                enum
              ></va-select-field>
            </v-chip>
          </v-chip-group>
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
      selected: [],
    };
  },
};
</script>
