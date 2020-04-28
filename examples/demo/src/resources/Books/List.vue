<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list
      :filters="[
        'q',
        'title',
        {
          source: 'publisher',
          type: 'select',
          optionText: 'name',
          multiple: true,
          reference: 'publishers',
        },
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
            src: 'thumbnails.small',
          },
          'category',
          {
            source: 'publisher',
            type: 'reference',
            reference: 'publishers',
            text: 'name',
            chip: true,
            color: 'orange',
          },
          'title',
          {
            source: 'price',
            type: 'number',
            format: 'currency',
          },
          { source: 'commentable', type: 'boolean', editable: true },
          'formats',
          {
            source: 'publication_date',
            type: 'date',
            format: 'long',
          },
          'authors',
        ]"
        :sortable="['title', 'price', 'publication_date']"
        show-expand
        v-bind="props"
        v-model="selected"
        :options.sync="options"
      >
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
        <template v-slot:expanded-item="{ item }">
          {{ item.description }}
        </template>
      </va-datagrid>
    </va-list>
  </base-material-card>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      options: {},
      selected: [],
    };
  },
};
</script>
