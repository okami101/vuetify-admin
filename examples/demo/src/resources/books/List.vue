<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-data-iterator
      :filters="filters"
      :include="['publisher', 'authors', 'media']"
      v-model="selected"
      :options.sync="options"
      v-slot="props"
    >
      <va-data-table
        :fields="fields"
        show-expand
        v-bind="props"
        v-model="selected"
        :options.sync="options"
      >
        <template v-slot:field.authors="{ value }">
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
        <template v-slot:expanded-item="{ item }">
          {{ item.description }}
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
        { source: "category", type: "select", attributes: { chip: true } },
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
        "authors",
      ],
      options: {},
      selected: [],
    };
  },
};
</script>
