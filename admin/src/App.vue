<template>
  <va-admin title="Bookstore Admin" :menu="menu"></va-admin>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
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
