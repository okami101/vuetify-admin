<template>
  <v-card>
    <v-card-title>
      <h1 class="display-1">
        {{ title }}
      </h1>
    </v-card-title>
    <v-card-text>
      <va-list :filters="filters">
        <va-data-table :fields="fields"></va-data-table>
      </va-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      filters: [
        {
          source: "userId",
          type: "select",
          alwaysOn: true,
          attributes: { reference: "users" },
        },
      ],
      fields: [
        {
          source: "user",
          type: "reference",
          attributes: { reference: "users", action: "edit", chip: true },
        },
        { source: "title", sortable: true },
        "body",
      ],
    };
  },
};
</script>
