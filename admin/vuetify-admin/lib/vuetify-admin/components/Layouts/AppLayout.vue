<template>
  <div>
    <app-header @mini="mini = !mini"></app-header>
    <app-sidebar :menu="menu" :mini="mini"></app-sidebar>

    <v-content>
      <app-breadcrumbs></app-breadcrumbs>
      <app-messages></app-messages>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import AppMessages from "./AppMessages";
import AppBreadcrumbs from "./AppBreadcrumbs";

export default {
  name: "AppLayout",
  components: {
    AppHeader,
    AppSidebar,
    AppMessages,
    AppBreadcrumbs
  },
  props: {
    menu: Array
  },
  data() {
    return {
      mini: false
    };
  }
};
</script>

<style>
.v-content {
  background-color: #fafafa;
  min-height: 100vh;
}
</style>
