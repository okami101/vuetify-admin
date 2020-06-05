<template>
  <va-show-layout>
    <va-show :item="item">
      <v-row justify="center">
        <v-col sm="4">
          <base-material-card>
            <template v-slot:heading>
              <div class="display-2">
                {{ title }}
              </div>
            </template>
            <v-card-text>
              <va-field
                source="user"
                type="reference"
                reference="users"
                chip
              ></va-field>
              <va-field source="title"></va-field>
              <va-field source="body"></va-field>
            </v-card-text>
          </base-material-card>
        </v-col>
      </v-row>
    </va-show>
    <base-material-card
      :icon="$admin.getResource('comments').icon"
      :title="$admin.getResource('comments').pluralName"
    >
      <va-list
        resource="comments"
        disable-pagination
        disable-query-string
        :filter="{
          postId: id,
        }"
      >
        <va-data-table :fields="fields" disable-select></va-data-table>
      </va-list>
    </base-material-card>
  </va-show-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
  data() {
    return {
      fields: [
        { source: "name", sortable: true },
        { source: "email", type: "email" },
        "body",
      ],
    };
  },
};
</script>
