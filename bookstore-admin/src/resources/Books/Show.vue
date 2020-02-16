<template>
  <va-show>
    <va-tabbed-show :tabs="tabs">
      <template v-slot:attributes>
        <va-simple-show :fields="fields"></va-simple-show>
      </template>
      <template v-slot:summary>
        <va-rich-text-field source="summary"></va-rich-text-field>
      </template>
    </va-tabbed-show>
  </va-show>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { id: "attributes", icon: "mdi-eye" },
        { id: "summary", icon: "mdi-text" }
      ],
      fields: ["isbn", "title", "description", "author", "publication_date"]
    };
  }
};
</script>
