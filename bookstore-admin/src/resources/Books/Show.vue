<template>
  <va-show>
    <va-tabbed-show :tabs="tabs">
      <template v-slot:attributes>
        <va-simple-show :fields="fields"></va-simple-show>
      </template>
      <template v-slot:summary>
        <va-text-field value="summary"></va-text-field>
      </template>
    </va-tabbed-show>
  </va-show>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { value: "attributes", icon: "mdi-eye" },
        { value: "summary", icon: "mdi-text" }
      ],
      fields: [
        { value: "isbn" },
        { value: "title" },
        { value: "description" },
        { value: "author" },
        { value: "publication_date" }
      ]
    };
  }
};
</script>
