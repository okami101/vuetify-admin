<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list :filters="filters" :include="['book']">
      <va-data-table :fields="fields" show-expand>
        <template v-slot:expanded-item="{ item }">
          {{ item.body }}
        </template>
        <template v-slot:[`field.quality`]="{ item }">
          {{ item.rating >= 3 ? $t("good") : $t("bad") }}
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
        {
          source: "book",
          type: "autocomplete",
          attributes: {
            optionText: "title",
            multiple: true,
            reference: "books",
          },
        },
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
          source: "book",
          type: "reference",
          attributes: {
            optionText: "title",
            reference: "books",
          },
        },
        {
          source: "status",
          type: "select",
          attributes: {
            chip: true,
            color: (v) => this.$statusColor(v),
          },
        },
        { source: "rating", type: "rating", sortable: true },
        "quality",
        { source: "author", sortable: true },
        {
          source: "publication_date",
          type: "date",
          sortable: true,
        },
      ],
    };
  },
};
</script>
