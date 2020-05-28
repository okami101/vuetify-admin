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
        ></va-data-table>
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
        {
          source: "authors",
          type: "reference-array",
          attributes: {
            reference: "authors",
            color: "primary",
            small: true,
            column: true,
          },
        },
      ],
      options: {},
      selected: [],
    };
  },
};
</script>
