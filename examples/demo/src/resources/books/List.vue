<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list
      :filters="filters"
      :include="['category', 'publisher', 'authors', 'media']"
    >
      <va-data-table :fields="fields" show-expand>
        <template v-slot:expanded-item="{ item }">
          {{ item.description }}
        </template>
      </va-data-table>
    </va-list>
  </base-material-card>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      filters: [
        "title",
        {
          source: "publisher",
          type: "select",
          attributes: {
            optionText: "name",
            multiple: true,
            reference: "publishers",
          },
        },
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
        {
          source: "cover",
          type: "image",
          link: "show",
          attributes: {
            src: "thumbnails.small",
          },
        },
        { source: "category.name", labelKey: "category", type: "chip" },
        {
          source: "publisher",
          type: "reference",
          attributes: {
            reference: "publishers",
            text: "name",
            chip: true,
            color: "orange",
          },
        },
        { source: "title", sortable: true },
        {
          source: "price",
          type: "number",
          sortable: true,
          attributes: {
            format: "currency",
          },
        },
        { source: "commentable", type: "boolean", editable: true },
        {
          source: "formats",
          type: "array",
          attributes: {
            select: true,
            color: "yellow",
            small: true,
            column: true,
          },
        },
        {
          source: "publication_date",
          type: "date",
          sortable: true,
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
