<template>
  <div>
    <breadcrumbs></breadcrumbs>
    <v-container fluid>
      <h1 class="mb-5 display-1">{{ getTitle }}</h1>
      <slot></slot>
    </v-container>
  </div>
</template>

<script>
import Breadcrumbs from "./Breadcrumbs";

export default {
  name: "Page",
  components: {
    Breadcrumbs
  },
  props: {
    title: [String, Function]
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
    this.$route.meta.label = this.getTitle;
    document.title = this.getTitle;
  }
};
</script>
