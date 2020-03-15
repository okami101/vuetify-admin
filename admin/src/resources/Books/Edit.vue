<template>
  <va-edit>
    <books-form :item="item"></books-form>
    <v-card>
      <va-list
        resource="reviews"
        disable-query-string
        :fields="['status', 'rating', 'author', 'body', 'publication_date']"
        :filter="{
          book: item.id
        }"
        :filters="[
          'q',
          { source: 'rating', type: 'rating' },
          {
            source: 'status',
            type: 'select',
            options: { enum: true, multiple: true }
          },
          'author',
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
        flat
        v-model="selected"
        :options.sync="options"
        v-slot="props"
      >
        <va-datagrid
          :fields="[
            'status',
            { source: 'rating', type: 'rating' },
            'quality',
            'author',
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
          <template v-slot:quality="{ item }">
            {{ item.rating >= 3 ? $t("good") : $t("bad") }}
          </template>
          <template v-slot:status="{ item, value }">
            <v-chip :color="$statusColor(value)">
              <va-select-field
                resource="reviews"
                source="status"
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
import BooksForm from "./Form";

export default {
  props: {
    item: Object
  },
  components: {
    BooksForm
  },
  data() {
    return {
      options: {},
      selected: []
    };
  }
};
</script>
