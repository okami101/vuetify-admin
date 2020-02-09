<template>
  <va-show :title="({ title }) => `Detail of book '${title}'`">
    <va-tabbed-show :tabs="tabs">
      <template v-slot:attributes>
        <va-simple-show :fields="fields"></va-simple-show>
      </template>
      <template v-slot:summary>
        <v-card flat>
          <v-card-text>
            <va-text-field value="summary"></va-text-field>
          </v-card-text>
        </v-card>
      </template>
    </va-tabbed-show>
  </va-show>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { value: "attributes", text: "Attributes", icon: "mdi-eye" },
        { value: "summary", text: "Summary", icon: "mdi-text" }
      ],
      fields: [
        { value: "isbn", text: "ISBN" },
        { value: "title", text: "Title" },
        { value: "description", text: "Description" },
        { value: "author", text: "Author" },
        { value: "publication_date", text: "Publication date" }
      ]
    };
  }
};
</script>
