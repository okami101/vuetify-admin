<template>
  <va-layout>
    <va-app-bar
      slot="app-bar"
      :header-menu="headerMenu"
      :profile-menu="profileMenu"
      color="secondary"
      dense
      dark
      @drawer="drawer = !drawer"
      @mini-variant="mini = !mini"
    ></va-app-bar>
    <va-sidebar
      slot="sidebar"
      :menu="sidebarMenu"
      dark
      v-model="drawer"
      :mini-variant="mini"
    >
      <template v-slot:img="props">
        <v-img
          src="../assets/splash.jpg"
          gradient="to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)"
          v-bind="props"
        />
      </template>
    </va-sidebar>
    <template slot="header">
      <va-breadcrumbs></va-breadcrumbs>
      <impersonate-message></impersonate-message>
    </template>
    <va-aside slot="aside"></va-aside>
    <va-footer slot="footer" :menu="footerMenu">
      &copy; 2020,
      <v-icon size="18">
        mdi-xml
      </v-icon>
      with
      <v-icon size="18">
        mdi-heart
      </v-icon>
      by
      <a
        href="https://vtec.okami101.io"
        target="_blank"
        class="font-weight-bold"
        >Okami 101</a
      >
      for a better web.
    </va-footer>
  </va-layout>
</template>

<script>
import ImpersonateMessage from "@/components/ImpersonateMessage";
import nav from "../_nav";

export default {
  name: "App",
  components: {
    ImpersonateMessage,
  },
  data() {
    return {
      drawer: null,
      mini: false,
      headerMenu: [
        ...this.$admin.getResourceLinks([
          "publishers",
          "authors",
          "books",
          "reviews",
        ]),
        {
          href: "https://github.com/okami101/vtec-admin",
          text: "Github",
        },
      ],
      footerMenu: [
        {
          href: "https://github.com/okami101/vtec-admin",
          text: "Github",
        },
        {
          href: "https://vtec.okami101.io",
          text: "Documentation",
        },
        {
          href: "https://adr1enbe4udou1n.mit-license.org",
          text: "License",
        },
      ],
      profileMenu: [
        {
          icon: "mdi-account",
          text: this.$t("menu.profile"),
          link: "/profile",
        },
      ],
      sidebarMenu: nav(this.$i18n, this.$admin),
    };
  },
};
</script>
