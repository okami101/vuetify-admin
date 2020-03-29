<template>
  <v-app v-if="loaded">
    <template v-if="user">
      <app-header
        :header-menu="headerMenu"
        :profile-menu="profileMenu"
        @mini="mini = !mini"
        :color="appBarColor"
        :dense="appBarDense"
      ></app-header>
      <app-sidebar :menu="sidebarMenu" :mini="mini"></app-sidebar>

      <v-content>
        <div class="d-flex flex-column fill-height">
          <app-breadcrumbs></app-breadcrumbs>
          <slot name="message"></slot>
          <app-messages></app-messages>
          <v-container fluid>
            <router-view></router-view>
          </v-container>

          <v-spacer></v-spacer>

          <app-footer :menu="footerMenu">
            <slot name="footer"></slot>
          </app-footer>
        </div>
      </v-content>

      <app-aside></app-aside>
    </template>
    <v-content v-else>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from "../Layout/AppHeader";
import AppFooter from "../Layout/AppFooter";
import AppSidebar from "../Layout/AppSidebar";
import AppAside from "../Layout/AppAside";
import AppMessages from "../Layout/AppMessages";
import AppBreadcrumbs from "../Layout/AppBreadcrumbs";
import { mapState } from "vuex";

export default {
  name: "Admin",
  components: {
    AppHeader,
    AppFooter,
    AppSidebar,
    AppAside,
    AppMessages,
    AppBreadcrumbs,
  },
  props: {
    headerMenu: Array,
    footerMenu: Array,
    sidebarMenu: Array,
    profileMenu: Array,
    appBarColor: {
      type: String,
      default: "primary",
    },
    appBarDense: Boolean,
  },
  data() {
    return {
      mini: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      loaded: (state) => state.auth.loaded,
    }),
  },
};
</script>

<style>
.v-content {
  background-color: #fafafa;
  min-height: 100vh;
}
</style>
