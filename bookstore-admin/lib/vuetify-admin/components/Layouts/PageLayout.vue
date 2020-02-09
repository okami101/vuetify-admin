<template>
  <div>
    <breadcrumbs></breadcrumbs>
    <v-container fluid>
      <v-card>
        <v-card-title>
          <v-row class="align-center">
            <v-col sm="auto">
              <va-title :title="title"></va-title>
            </v-col>
            <v-col class="d-flex">
              <v-spacer></v-spacer>
              <slot name="actions-header"></slot>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <slot></slot>
        </v-card-text>
        <v-card-actions>
          <slot name="actions-footer"></slot>
        </v-card-actions>
      </v-card>
      <slot name="footer"></slot>
    </v-container>
  </div>
</template>

<script>
import Breadcrumbs from "./Breadcrumbs";

export default {
  name: "Page",
  props: {
    title: [String, Function]
  },
  components: {
    Breadcrumbs
  }
};
</script>
