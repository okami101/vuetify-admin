<template>
  <v-app v-if="loaded">
    <template>
      <slot name="header"></slot>
      <slot name="sidebar"></slot>

      <v-content>
        <div class="d-flex flex-column fill-height">
          <app-breadcrumbs></app-breadcrumbs>
          <slot name="message"></slot>
          <app-messages></app-messages>
          <v-container fluid>
            <router-view />
          </v-container>

          <v-spacer></v-spacer>

          <slot name="footer"></slot>
        </div>
      </v-content>

      <app-aside></app-aside>
    </template>
  </v-app>
</template>

<script>
import AppAside from "../Layout/AppAside";
import AppMessages from "../Layout/AppMessages";
import AppBreadcrumbs from "../Layout/AppBreadcrumbs";
import { mapState } from "vuex";

export default {
  name: "Admin",
  components: {
    AppAside,
    AppMessages,
    AppBreadcrumbs,
  },
  computed: {
    ...mapState({
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
