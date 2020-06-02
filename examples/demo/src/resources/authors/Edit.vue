<template>
  <va-edit-layout>
    <authors-form :id="id" :title="title" :item="item"></authors-form>
    <base-material-card
      icon="mdi-book"
      :title="$admin.getResource('books').pluralName"
    >
      <va-data-iterator
        resource="books"
        disable-global-search
        disable-pagination
        disable-query-string
        disable-create
        disable-export
        :association="association"
        :filter="{
          authors: id,
        }"
        :include="['publisher', 'reviews']"
        :options.sync="options"
        v-slot="props"
      >
        <va-data-table
          resource="books"
          disable-sort
          disable-select
          disable-clone
          disable-delete
          :association="association"
          :fields="fields"
          v-bind="props"
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
          source: "reviews",
          type: "reference-array",
          attributes: {
            reference: "reviews",
            color: "green",
            small: true,
            column: true,
          },
        },
      ],
      options: {},
      association: {
        resource: "authors",
        source: "author_id",
        id: this.id,
      },
    };
  },
};
</script>
