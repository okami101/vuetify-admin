<template>
  <v-app>
    <v-content v-if="$route.name === 'login'">
      <router-view></router-view>
    </v-content>
    <template v-else-if="user">
      <app-header :menu="profileMenu" @mini="mini = !mini"></app-header>
      <app-sidebar :menu="sidebarMenu" :mini="mini"></app-sidebar>

      <v-content>
        <app-breadcrumbs></app-breadcrumbs>
        <app-messages></app-messages>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>

      <app-aside></app-aside>
    </template>
  </v-app>
</template>

<script>
import AppHeader from "../Layout/AppHeader";
import AppSidebar from "../Layout/AppSidebar";
import AppAside from "../Layout/AppAside";
import AppMessages from "../Layout/AppMessages";
import AppBreadcrumbs from "../Layout/AppBreadcrumbs";
import { mapState } from "vuex";

export default {
  name: "Admin",
  components: {
    AppHeader,
    AppSidebar,
    AppAside,
    AppMessages,
    AppBreadcrumbs
  },
  props: {
    sidebarMenu: Array,
    profileMenu: Array
  },
  data() {
    return {
      mini: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  }
};
</script>

<style>
.v-content {
  background-color: #fafafa;
  min-height: 100vh;
}
</style>
