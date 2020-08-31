<template>
  <va-show-layout :title="title">
    <va-show :item="item">
      <v-row justify="center">
        <v-col sm="4">
          <v-card>
            <v-card-text>
              <va-field source="name"></va-field>
              <va-field source="username"></va-field>
              <va-field source="email"></va-field>
              <va-field source="address" type="address"></va-field>
              <va-field source="phone"></va-field>
              <va-field source="website" type="url"></va-field>
              <va-field source="company.name"></va-field>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </va-show>
    <v-card>
      <v-card-title>
        <h1 class="display-1">
          {{ $admin.getResource("posts").pluralName }}
        </h1>
      </v-card-title>
      <v-card-text>
        <va-list
          resource="posts"
          disable-pagination
          disable-query-string
          :filter="{
            userId: id,
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
      fields: [{ source: "title", sortable: true }, "body"],
    };
  },
};
</script>
