<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list :filters="filters" :include="['media', 'books_count']">
      <va-data-table :fields="fields">
        <template v-slot:[`field.address`]="{ value }">
          {{ value.postcode }} {{ value.city }}
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
        "name",
        "founder",
        "headquarter",
        { source: "active", type: "boolean" },
      ],
      fields: [
        {
          source: "logo",
          type: "image",
          link: "show",
          attributes: {
            src: "thumbnails.small",
            contain: true,
          },
        },
        { source: "name", link: "show", sortable: true },
        { source: "type", type: "select" },
        { source: "founder", sortable: true },
        { source: "headquarter", sortable: true },
        { source: "url", type: "url" },
        { source: "active", type: "boolean" },
        "address.street",
        {
          source: "address",
          label: this.$t("address"),
        },
        {
          source: "opening_date",
          type: "date",
          sortable: true,
        },
        { source: "books_count", type: "number", sortable: true },
      ],
    };
  },
};
</script>
