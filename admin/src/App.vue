<template>
  <va-admin :sidebar-menu="sidebarMenu" :profile-menu="profileMenu">
    <impersonate-message slot="message"></impersonate-message>
  </va-admin>
</template>

<script>
import ImpersonateMessage from "@/components/ImpersonateMessage";

export default {
  name: "App",
  components: {
    ImpersonateMessage
  },
  data() {
    return {
      profileMenu: [
        {
          icon: "mdi-account",
          text: this.$t("menu.profile"),
          link: "/profile"
        }
      ],
      sidebarMenu: [
        {
          icon: "mdi-view-dashboard",
          text: this.$t("menu.dashboard"),
          link: "/"
        },
        { divider: true },
        { heading: this.$t("menu.bookstore") },
        {
          icon: "mdi-globe-model",
          text: this.$t("menu.publishers"),
          link: "/publishers",
          permissions: ["admin", "editor"]
        },
        {
          icon: "mdi-account",
          text: this.$t("menu.authors"),
          link: "/authors",
          permissions: ["admin", "editor"]
        },
        {
          icon: "mdi-book",
          text: this.$t("menu.books"),
          expanded: true,
          permissions: ["admin", "editor", "author"],
          children: [
            {
              icon: "mdi-view-list",
              text: this.$t("menu.list"),
              link: "/books"
            },
            {
              icon: "mdi-plus",
              text: this.$t("menu.create"),
              link: "/books/create"
            }
          ]
        },
        {
          icon: "mdi-comment",
          text: this.$t("menu.reviews"),
          link: "/reviews",
          permissions: ["admin", "editor", "author"]
        },
        { divider: true },
        { heading: this.$t("menu.other") },
        {
          icon: "mdi-account",
          text: this.$t("menu.users"),
          link: "/users",
          permissions: ["admin"]
        },
        {
          icon: "mdi-settings",
          text: this.$t("menu.settings"),
          link: "/settings",
          permissions: ["admin"]
        },
        {
          icon: "mdi-message",
          text: this.$t("menu.feedback"),
          link: "/feedback",
          permissions: ["admin", "editor"]
        },
        { icon: "mdi-help-circle", text: this.$t("menu.help"), link: "/help" }
      ]
    };
  }
};
</script>
