<template>
  <va-admin>
    <va-header
      slot="header"
      :header-menu="headerMenu"
      :profile-menu="profileMenu"
      color="secondary"
      dense
      dark
      @mini="mini = !mini"
    ></va-header>
    <va-sidebar slot="sidebar" :menu="sidebarMenu" dark :mini="mini">
      <template v-slot:img="props">
        <v-img
          src="../assets/splash.jpg"
          gradient="to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)"
          v-bind="props"
        />
      </template>
    </va-sidebar>
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
    <impersonate-message slot="message"></impersonate-message>
  </va-admin>
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
      mini: false,
      headerMenu: [
        this.$admin.getResourceLink("publishers"),
        this.$admin.getResourceLink("authors"),
        this.$admin.getResourceLink("books"),
        this.$admin.getResourceLink("reviews"),
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
      sidebarMenu: nav(this.$i18n, this.$admin.getResourceLink),
    };
  },
};
</script>
