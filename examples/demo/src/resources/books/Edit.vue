<template>
  <va-edit-layout>
    <books-form :id="id" :title="title" :item="item"></books-form>
    <base-material-card
      icon="mdi-comment"
      :title="$admin.getResource('reviews').pluralName"
    >
      <va-list
        resource="reviews"
        disable-query-string
        :items-per-page="10"
        :filter="{
          book: id,
        }"
        :filters="filters"
        disable-create
      >
        <va-data-table
          :fields="fields"
          row-create
          row-edit
          :create-data="{
            book_id: id,
          }"
        ></va-data-table>
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
        { source: "rating", type: "rating" },
        {
          source: "status",
          type: "select",
          attributes: {
            multiple: true,
          },
        },
        "author",
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
        {
          source: "status",
          type: "select",
          attributes: {
            chip: true,
            color: (v) => this.$statusColor(v),
          },
        },
        { source: "rating", type: "rating" },
        {
          source: "body",
          type: "text",
          attributes: { truncate: 100, multiline: true },
        },
        "author",
        {
          source: "publication_date",
          type: "date",
        },
      ],
    };
  },
};
</script>
