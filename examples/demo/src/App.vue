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
    <va-sidebar
      slot="sidebar"
      :menu="sidebarMenu"
      dark
      bg="/splash.jpg"
      :bg-opacity="0"
      :mini="mini"
    ></va-sidebar>
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
      <a href="https://www.my-awesome-company.com">My Awesome Company</a> for a
      better web.
    </va-footer>
    <impersonate-message slot="message"></impersonate-message>
  </va-admin>
</template>

<script>
import ImpersonateMessage from "@/components/ImpersonateMessage";

export default {
  name: "App",
  components: {
    ImpersonateMessage,
  },
  data() {
    return {
      mini: false,
      headerMenu: [
        {
          link: "/",
          text: this.$t("menu.dashboard"),
        },
        {
          link: "/publishers",
          text: this.$t("menu.publishers"),
        },
        {
          link: "/authors",
          text: this.$t("menu.authors"),
        },
        {
          link: "/books",
          text: this.$t("menu.books"),
        },
        {
          link: "/reviews",
          text: this.$t("menu.reviews"),
        },
      ],
      footerMenu: [
        {
          href: "#",
          text: "About Us",
        },
        {
          href: "#",
          text: "Blog",
        },
        {
          href: "#",
          text: "Licenses",
        },
      ],
      profileMenu: [
        {
          icon: "mdi-account",
          text: this.$t("menu.profile"),
          link: "/profile",
        },
      ],
      sidebarMenu: [
        {
          icon: "mdi-view-dashboard",
          text: this.$t("menu.dashboard"),
          link: "/",
        },
        { divider: true },
        { heading: this.$t("menu.bookstore") },
        this.$admin.getResourceLink("publishers"),
        this.$admin.getResourceLink("authors"),
        this.$admin.getResourceLink("books"),
        this.$admin.getResourceLink("reviews"),
        { divider: true },
        { heading: this.$t("menu.other") },
        this.$admin.getResourceLink("users"),
        {
          icon: "mdi-settings",
          text: this.$t("menu.settings"),
          link: "/settings",
          permissions: ["admin"],
        },
        {
          icon: "mdi-message",
          text: this.$t("menu.feedback"),
          link: "/feedback",
          permissions: ["admin", "editor"],
        },
        { icon: "mdi-help-circle", text: this.$t("menu.help"), link: "/help" },
      ],
    };
  },
};
</script>
