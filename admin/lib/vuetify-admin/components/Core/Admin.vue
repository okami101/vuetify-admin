<template>
  <v-app>
    <div v-if="loaded">
      <v-content v-if="unauthenticatedRoute">
        <router-view></router-view>
      </v-content>
      <app-layout v-else-if="user" :menu="menu"></app-layout>
    </div>
    <v-overlay v-else>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
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
  data() {
    return {
      loaded: false
    };
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

    /**
     * Inital authentification check on full app reload
     */
    let isLogged = await this.checkAuth();

    if (isLogged && this.$route.name === "login") {
      // Redirect to home on login route if already connected
      await this.$router.push("/");
    }

    // App loaded, show UI
    this.loaded = true;
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
