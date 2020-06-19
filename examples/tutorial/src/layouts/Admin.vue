<template>
  <va-layout>
    <va-app-bar
      slot="app-bar"
      dense
      dark
      @toggle="
        $vuetify.breakpoint.lgAndUp ? (mini = !mini) : (drawer = !drawer)
      "
    ></va-app-bar>
    <va-sidebar
      slot="sidebar"
      :menu="sidebarMenu"
      v-model="drawer"
      :mini-variant="mini"
    ></va-sidebar>
    <va-breadcrumbs slot="header"></va-breadcrumbs>
    <va-aside slot="aside"></va-aside>
    <va-footer slot="footer">
      &copy; 2020,
      <v-icon size="18">
        mdi-xml
      </v-icon>
      with
      <v-icon size="18">
        mdi-heart
      </v-icon>
      by
      <a href="https://www.company.com">My Awesome Company</a> for a better web.
    </va-footer>
  </va-layout>
</template>

<script>
import nav from "../_nav";

export default {
  name: "App",
  data() {
    return {
      drawer: null,
      mini: false,
      sidebarMenu: nav(this.$i18n, this.$admin),
    };
  },
};
</script>
