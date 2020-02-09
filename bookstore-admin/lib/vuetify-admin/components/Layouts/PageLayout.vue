<template>
  <div>
    <breadcrumbs></breadcrumbs>
    <v-container fluid>
      <va-title class="mb-5" :title="title" v-if="title"></va-title>
      <slot></slot>
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
