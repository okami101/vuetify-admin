<template>
  <va-layout>
    <va-app-bar
      slot="app-bar"
      :header-menu="headerMenu"
      :profile-menu="profileMenu"
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
    <va-footer slot="footer" :menu="footerMenu">
      <v-icon size="18"> mdi-xml </v-icon>
      with
      <v-icon size="18"> mdi-heart </v-icon>
      by
      <a
        href="https://www.okami101.io/vuetify-admin"
        target="_blank"
        class="font-weight-bold"
        >Okami 101</a
      >
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
      headerMenu: [
        {
          link: "/",
          text: this.$t("menu.dashboard"),
        },
      ],
      footerMenu: [
        {
          href: "https://github.com/okami101/vuetify-admin",
          text: "Github",
        },
        {
          href: "https://www.okami101.io/vuetify-admin",
          text: "Docs",
        },
        {
          href: "https://va-demo.okami101.io",
          text: "Demo",
        },
        {
          href: "https://adr1enbe4udou1n.mit-license.org",
          text: "License",
        },
      ],
      profileMenu: [],
      sidebarMenu: nav(this.$i18n, this.$admin),
    };
  },
};
</script>
