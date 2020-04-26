<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list
      :fields="[
        'book_id',
        'book.title',
        'status',
        'rating',
        'author',
        'body',
        'publication_date',
      ]"
      :filters="[
        'q',
        {
          source: 'book',
          type: 'autocomplete',
          optionText: 'title',
          multiple: true,
          reference: 'books',
        },
        { source: 'rating', type: 'rating' },
        {
          source: 'status',
          type: 'select',
          multiple: true,
        },
        'author',
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
      :include="['book']"
      flat
      v-model="selected"
      :options.sync="options"
      v-slot="props"
    >
      <va-datagrid
        :fields="[
          'book',
          'status',
          { source: 'rating', type: 'rating' },
          'quality',
          'author',
          {
            source: 'publication_date',
            type: 'date',
            format: 'long',
          },
        ]"
        :sortable="['rating', 'author', 'publication_date']"
        v-bind="props"
        show-expand
        v-model="selected"
        :options.sync="options"
      >
        <template v-slot:expanded-item="{ item }">
          {{ item.body }}
        </template>
        <template v-slot:book="{ value }">
          <router-link :to="{ name: 'books_show', params: { id: value.id } }">
            {{ value.title }}
          </router-link>
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
