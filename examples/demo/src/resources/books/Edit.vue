<template>
  <va-edit>
    <books-form :id="id" :title="title" :item="item"></books-form>
    <base-material-card
      icon="mdi-comment"
      :title="$tc('resources.reviews.name', 10)"
    >
      <va-list
        resource="reviews"
        disable-query-string
        :items-per-page="10"
        :filter="{
          book: id,
        }"
        :filters="[
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
        v-model="selected"
        :options.sync="options"
        v-slot="props"
      >
        <va-data-table
          :fields="[
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
          v-bind="props"
          v-model="selected"
          :options.sync="options"
        >
          <template v-slot:quality="{ item }">
            {{ item.rating >= 3 ? $t("good") : $t("bad") }}
          </template>
        </va-data-table>
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
