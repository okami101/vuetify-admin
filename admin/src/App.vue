<template>
  <va-admin :sidebar-menu="sidebarMenu" :profile-menu="profileMenu">
    <template v-slot:message v-if="user && user.impersonate">
      <v-alert type="warning" text>
        <i18n path="users.logged_as">
          <strong>{{ user.name }}</strong>
          <a href="javascript:void(0)" @click="stopImpersonate">{{
            $t("here")
          }}</a>
        </i18n>
      </v-alert>
    </template>
  </va-admin>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
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
          icon: "mdi-account",
          text: this.$t("menu.users"),
          link: "/users"
        },
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
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    ...mapActions({
      checkAuth: "auth/checkAuth"
    }),
    async stopImpersonate() {
      try {
        await this.$axios.post(`/api/users/stopImpersonate`);

        /**
         * Check auth and redirect to home
         */
        this.checkAuth();
        this.$router.push("/").catch(() => {});
      } catch ({ response }) {
        this.$snackbar.error(response.data.message);
      }
    }
  }
};
</script>
