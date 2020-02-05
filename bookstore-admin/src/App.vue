<template>
  <va-admin
    title="Bookstore Admin"
    :menu="menu"
    :auth-provider="authProviders[defaultProvider]"
    :data-provider="dataProviders[defaultProvider]"
  >
    <va-resource name="books"></va-resource>
    <va-resource name="reviews"></va-resource>
  </va-admin>
</template>

<script>
import symfonyDataProvider from "./providers/symfonyDataProvider";
import laravelDataProvider from "./providers/laravelDataProvider";
import jwtAuthProvider from "./providers/jwtAuthProvider";

export default {
  name: "App",
  data: () => ({
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
      { icon: "mdi-view-dashboard", text: "Dashboard", link: "/" },
      { divider: true },
      { heading: "Bookstore" },
      {
        icon: "mdi-book",
        text: "Books",
        expanded: true,
        children: [
          { icon: "mdi-view-list", text: "List", link: "/books" },
          { icon: "mdi-plus", text: "Create book", link: "/books/create" }
        ]
      },
      { icon: "mdi-comment", text: "Reviews", link: "/reviews" },
      { divider: true },
      { heading: "Other" },
      { icon: "mdi-settings", text: "Settings", link: "/settings" },
      { icon: "mdi-message", text: "Send feedback", link: "/feedback" },
      { icon: "mdi-help-circle", text: "Help", link: "/help" }
    ]
  })
};
</script>
