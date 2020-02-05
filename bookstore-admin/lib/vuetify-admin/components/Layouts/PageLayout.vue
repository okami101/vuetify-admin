<template>
  <div>
    <breadcrumbs></breadcrumbs>
    <v-container fluid>
      <h1 class="mb-5 display-1">{{ $route.meta.label }}</h1>
      <slot></slot>
    </v-container>
  </div>
</template>

<script>
import Breadcrumbs from "./Breadcrumbs";

export default {
  name: "PageLayout",
  components: {
    Breadcrumbs
  }
};
</script>
