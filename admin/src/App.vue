<template>
  <va-admin
    title="Bookstore Admin"
    :menu="menu"
    :auth-provider="authProviders[defaultAuthProvider]"
    :data-provider="dataProvider"
  >
    <va-resource name="publishers"></va-resource>
    <va-resource name="books"></va-resource>
    <va-resource name="authors"></va-resource>
    <va-resource name="reviews"></va-resource>
  </va-admin>
</template>

<script>
import laravelDataProvider from "vuetify-admin/providers/laravelDataProvider";
import jwtAuthProvider from "vuetify-admin/providers/jwtAuthProvider";
import airlockAuthProvider from "vuetify-admin/providers/airlockAuthProvider";

export default {
  name: "App",
  data() {
    return {
      defaultAuthProvider: process.env.VUE_APP_AUTH_PROVIDER,
      authProviders: {
        airlock: airlockAuthProvider(this.$axios, {
          routes: {
            login: "/auth/login",
            logout: "/auth/logout",
            user: "/api/user"
          },
          getName: u => u.name,
          getEmail: u => u.email,
          getPermissions: ({ roles }) => {
            return {
              is_admin: roles.includes("ROLE_ADMIN"),
              is_editor: roles.includes("ROLE_EDITOR"),
              is_author: roles.includes("ROLE_AUTHOR")
            };
          }
        }),
        jwt: jwtAuthProvider(this.$axios, {
          getName: u => u.name,
          getEmail: u => u.email,
          getPermissions: ({ roles }) => {
            return {
              is_admin: roles.includes("ROLE_ADMIN"),
              is_editor: roles.includes("ROLE_EDITOR"),
              is_author: roles.includes("ROLE_AUTHOR")
            };
          }
        })
      },
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
