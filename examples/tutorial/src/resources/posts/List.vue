<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list :filters="filters">
      <va-data-table :fields="fields"> </va-data-table>
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
        { source: "title", type: "text" },
        { source: "body", type: "text" },
      ],
    };
  },
};
</script>
