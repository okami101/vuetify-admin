<template>
  <va-edit-layout>
    <publishers-form :id="id" :title="title" :item="item"></publishers-form>
    <base-material-card
      icon="mdi-book"
      :title="$tc('resources.books.name', 10)"
    >
      <va-data-iterator
        resource="books"
        disable-query-string
        :items-per-page="10"
        :filter="{
          publisher: id,
        }"
        :filters="filters"
        :include="['authors']"
        v-model="selected"
        :options.sync="options"
        v-slot="props"
      >
        <va-data-table
          :fields="fields"
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
        </va-data-table>
      </va-data-iterator>
    </base-material-card>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
  data() {
    return {
      filters: [
        "title",
        {
          source: "authors",
          type: "autocomplete",
          attributes: {
            optionText: "name",
            multiple: true,
            reference: "authors",
          },
        },
        { source: "pricier_than", type: "number" },
        { source: "cheaper_than", type: "number" },
        { source: "commentable", type: "boolean" },
        {
          source: "published_before",
          type: "date",
        },
        {
          source: "published_after",
          type: "date",
        },
      ],
      fields: [
        { source: "isbn", link: "show" },
        { source: "category", type: "select", attributes: { chip: true } },
        "title",
        {
          source: "price",
          type: "number",
          attributes: {
            format: "currency",
          },
        },
        { source: "commentable", type: "boolean" },
        {
          source: "publication_date",
          type: "date",
        },
        "authors",
      ],
      options: {},
      selected: [],
    };
  },
};
</script>
