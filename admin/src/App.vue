<template>
  <va-admin
    title="Bookstore Admin"
    :menu="menu"
    :auth-provider="authProvider"
    :data-provider="dataProvider"
  >
    <va-resource name="publishers"></va-resource>
    <va-resource name="books"></va-resource>
    <va-resource name="authors"></va-resource>
    <va-resource name="reviews"></va-resource>
  </va-admin>
</template>

<script>
import airlockAuthProvider from "vuetify-admin/providers/airlockAuthProvider";
import laravelDataProvider from "vuetify-admin/providers/laravelDataProvider";

export default {
  name: "App",
  data() {
    return {
      authProvider: airlockAuthProvider(this.$axios, {
        routes: {
          login: "/auth/login",
          logout: "/auth/logout",
          user: "/api/user"
        }
      }),
      dataProvider: laravelDataProvider(this.$axios),
      menu: [
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
          link: "/publishers"
        },
        {
          icon: "mdi-account",
          text: this.$t("menu.authors"),
          link: "/authors"
        },
        {
          icon: "mdi-book",
          text: this.$t("menu.books"),
          expanded: true,
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
          link: "/reviews"
        },
        { divider: true },
        { heading: this.$t("menu.other") },
        {
          icon: "mdi-settings",
          text: this.$t("menu.settings"),
          link: "/settings"
        },
        {
          icon: "mdi-message",
          text: this.$t("menu.feedback"),
          link: "/feedback"
        },
        { icon: "mdi-help-circle", text: this.$t("menu.help"), link: "/help" }
      ]
    };
  }
};
</script>
