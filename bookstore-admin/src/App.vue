<template>
  <va-admin
    title="Bookstore Admin"
    :menu="menu"
    :auth-provider="authProviders[defaultProvider]"
    :data-provider="dataProviders[defaultProvider]"
  >
    <va-resource
      name="publishers"
      :label="$t('resources.publishers')"
      :singular="$t('resources.publisher')"
      :stringify="({ name }) => name"
    ></va-resource>
    <va-resource
      name="books"
      :label="$t('resources.books')"
      :singular="$t('resources.book')"
      :stringify="({ title }) => title"
    ></va-resource>
    <va-resource
      name="reviews"
      :label="$t('resources.reviews')"
      :singular="$t('resources.review')"
      :stringify="({ author }) => author"
    ></va-resource>
  </va-admin>
</template>

<script>
import symfonyDataProvider from "vuetify-admin/providers/symfonyDataProvider";
import laravelDataProvider from "vuetify-admin/providers/laravelDataProvider";
import jwtAuthProvider from "vuetify-admin/providers/jwtAuthProvider";

export default {
  name: "App",
  data() {
    return {
      defaultProvider: process.env.VUE_APP_DATA_PROVIDER,
      authProviders: {
        symfony: jwtAuthProvider(process.env.VUE_APP_SYMFONY_API_URL, {
          routes: {
            login: "authentication_token",
            user: "authentication_user"
          },
          tokenProp: "token"
        }),
        laravel: jwtAuthProvider(process.env.VUE_APP_LARAVEL_API_URL)
      },
      dataProviders: {
        symfony: symfonyDataProvider(process.env.VUE_APP_SYMFONY_API_URL),
        laravel: laravelDataProvider(process.env.VUE_APP_LARAVEL_API_URL)
      },
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
