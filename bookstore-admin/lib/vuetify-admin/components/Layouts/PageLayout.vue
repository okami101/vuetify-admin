<template>
  <div>
    <breadcrumbs></breadcrumbs>
    <v-container fluid>
      <v-card>
        <v-card-title>
          <v-toolbar flat>
            <v-row class="align-center">
              <v-col sm="auto">
                <h1 class="display-1">{{ getTitle }}</h1>
              </v-col>
              <v-col class="d-flex">
                <v-spacer></v-spacer>
                <slot name="actions-header"></slot>
              </v-col>
            </v-row>
          </v-toolbar>
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
  },
  data() {
    return {
      resource: this.$route.meta.model
    };
  },
  computed: {
    getTitle() {
      return this.resource ? this.title(this.resource) : this.title;
    }
  },
  created() {
    this.$route.meta.title = this.getTitle;
    document.title = this.getTitle;
  }
};
</script>
