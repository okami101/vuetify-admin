<template>
  <va-layout>
    <va-app-bar slot="app-bar" dense dark @mini="mini = !mini"></va-app-bar>
    <va-sidebar slot="sidebar" :menu="sidebarMenu" :mini="mini"></va-sidebar>
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
      mini: false,
      sidebarMenu: nav(this.$i18n, this.$admin),
    };
  },
};
</script>
