<template>
  <va-show>
    <va-tabbed-show :tabs="tabs">
      <template v-slot:attributes>
        <va-simple-show :fields="fields"></va-simple-show>
      </template>
      <template v-slot:summary>
        <va-text-field source="summary"></va-text-field>
      </template>
    </va-tabbed-show>
  </va-show>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { source: "attributes", icon: "mdi-eye" },
        { source: "summary", icon: "mdi-text" }
      ],
      fields: [
        { source: "isbn" },
        { source: "title" },
        { source: "description" },
        { source: "author" },
        { source: "publication_date" }
      ]
    };
  }
};
</script>
