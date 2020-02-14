<template>
  <v-app>
    <div v-if="loaded">
      <v-content v-if="unauthenticatedRoute">
        <router-view></router-view>
      </v-content>
      <app-layout v-else-if="user" :title="title" :menu="menu"></app-layout>
      <slot></slot>
    </div>
    <v-overlay v-else>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import auth from "../../store/auth";
import api from "../../store/api";
import AppLayout from "../Layouts/AppLayout";

export default {
  name: "Admin",
  components: {
    AppLayout
  },
  props: {
    title: String,
    menu: Array,
    authProvider: Object,
    dataProvider: Object
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
  created() {
    /**
     * Auth store & api dispatcher module injection
     */
    this.$store.registerModule("auth", auth(this.authProvider));
    this.$store.registerModule("api", api);
  },
  async mounted() {
    this.$router.beforeEach(async (to, from, next) => {
      /**
       * Check and reload authenticated user with permissions
       * after each navigation
       */
      if (to.name !== "login") {
        try {
          await this.loadUser();
        } catch (e) {
          return next("/login");
        }
      }

      document.title = to.meta.title;
      next();
    });

    /**
     * Load authenticated user
     */
    if (this.unauthenticatedRoute) {
      try {
        await this.loadUser();
        await this.$router.push("/");
      } catch (e) {}
    } else {
      try {
        await this.loadUser();
      } catch (e) {
        await this.$router.push("/login");
      }
    }

    document.title = this.$route.meta.title;
    this.loaded = true;
  },
  methods: {
    ...mapActions({
      loadUser: "auth/loadUser"
    })
  }
};
</script>
