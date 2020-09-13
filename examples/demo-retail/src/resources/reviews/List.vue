<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list :filters="filters" :sort-by="['date']" :sort-desc="[true]">
      <va-data-table :fields="fields">
        <template v-slot:[`field.customer_id`]="{ item }">
          <div class="d-flex align-center my-2">
            <v-avatar class="mr-4" :size="36">
              <v-img :src="item.avatar"></v-img>
            </v-avatar>
            <span> {{ item.first_name }} {{ item.last_name }} </span>
          </div>
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
          source: "product_id",
          type: "autocomplete",
          attributes: {
            optionText: "reference",
            multiple: true,
            reference: "products",
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
        {
          source: "date_lte",
          type: "date",
        },
        {
          source: "date_gte",
          type: "date",
        },
      ],
      fields: [
        {
          source: "date",
          type: "date",
          sortable: true,
        },
        {
          source: "customer_id",
          type: "reference",
          attributes: {
            reference: "customers",
            fetch: true,
          },
        },
        {
          source: "product_id",
          type: "reference",
          attributes: {
            reference: "products",
            chip: true,
            fetch: true,
          },
        },
        { source: "rating", type: "rating", sortable: true },
        {
          source: "comment",
          type: "text",
          attributes: {
            truncate: 200,
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
      ],
    };
  },
};
</script>
