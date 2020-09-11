<template>
  <va-edit-layout>
    <publishers-form :id="id" :title="title" :item="item"></publishers-form>
    <base-material-card
      icon="mdi-book"
      :title="$admin.getResource('books').pluralName"
    >
      <va-list
        resource="books"
        disable-query-string
        :items-per-page="10"
        :filter="{
          publisher: id,
        }"
        :filters="filters"
        :include="['category', 'authors']"
      >
        <va-data-table :fields="fields"></va-data-table>
      </va-list>
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
        { source: "category.name", labelKey: "category", type: "chip" },
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
    };
  },
};
</script>
