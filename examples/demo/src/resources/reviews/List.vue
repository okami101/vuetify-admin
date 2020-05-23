<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-data-iterator
      :filters="[
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
      v-model="selected"
      :options.sync="options"
      v-slot="props"
    >
      <va-data-table
        :fields="[
          {
            source: 'book',
            type: 'reference',
            optionText: 'title',
            reference: 'books',
          },
          {
            source: 'status',
            type: 'select',
            chip: true,
            color: (v) => $statusColor(v),
          },
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
        <template v-slot:quality="{ item }">
          {{ item.rating >= 3 ? $t("good") : $t("bad") }}
        </template>
      </va-data-table>
    </va-data-iterator>
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
