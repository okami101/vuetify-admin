<template>
  <div>
    <breadcrumbs></breadcrumbs>
    <v-container fluid>
      <v-card>
        <v-card-title>
          <v-row class="align-center">
            <v-col sm="auto">
              <h1 class="display-1">{{ getTitle }}</h1>
            </v-col>
            <v-col class="d-flex">
              <v-spacer></v-spacer>
              <slot name="actions"></slot>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <slot></slot>
        </v-card-text>
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
      return typeof this.title === "function"
        ? this.title(this.resource)
        : this.title;
    }
  },
  created() {
    this.$route.meta.title = this.getTitle;
    document.title = this.getTitle;
  }
};
</script>
