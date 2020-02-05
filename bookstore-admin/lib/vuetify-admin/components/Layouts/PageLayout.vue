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
      model: this.$route.meta.model
    };
  },
  computed: {
    getTitle() {
      return this.model ? this.title(this.model) : this.title;
    }
  },
  created() {
    this.$route.meta.label = this.getTitle;
    document.title = this.getTitle;
  }
};
</script>
