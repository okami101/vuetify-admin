<template>
  <va-show-layout :title="title">
    <va-show :item="item">
      <v-row justify="center">
        <v-col sm="4">
          <v-card>
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
          </v-card>
        </v-col>
      </v-row>
    </va-show>
    <v-card>
      <v-card-title>
        <h1 class="display-1">
          {{ $admin.getResource("comments").pluralName }}
        </h1>
      </v-card-title>
      <v-card-text>
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
      </v-card-text>
    </v-card>
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
