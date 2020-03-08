<template>
  <v-app>
    <v-content v-if="unauthenticatedRoute">
      <router-view></router-view>
    </v-content>
    <app-layout v-else-if="user" :menu="menu"></app-layout>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import AppLayout from "vuetify-admin/components/Layout/AppLayout";

export default {
  name: "Admin",
  components: {
    AppLayout
  },
  props: {
    title: String,
    menu: Array
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    unauthenticatedRoute() {
      return this.$route.name === "login";
    }
  },
  async mounted() {
    /**
     * Recheck auth on app visible (switching tabs,...)
     */
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        this.checkAuth();
      }
    });
  },
  watch: {
    $route: {
      handler(val) {
        this.setTitle(val.meta.title || this.title);
        document.title = val.meta.title
          ? `${val.meta.title} | ${this.title}`
          : this.title;
      }
    }
  },
  methods: {
    ...mapMutations({
      setTitle: "layout/setTitle"
    }),
    ...mapActions({
      checkAuth: "auth/checkAuth"
    })
  }
};
</script>
