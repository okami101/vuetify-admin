<template>
  <v-app>
    <div v-if="loaded">
      <v-content v-if="unauthenticatedRoute">
        <router-view></router-view>
      </v-content>
      <app-layout v-else-if="user" :menu="menu"></app-layout>
      <slot></slot>
    </div>
    <v-overlay v-else>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import aside from "../../store/aside";
import auth from "../../store/auth";
import api from "../../store/api";
import form from "../../store/form";
import AppLayout from "../Layouts/AppLayout";

import en from "../../locales/en.json";
import fr from "../../locales/fr.json";

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
     * Load locales
     */
    this.$i18n.mergeLocaleMessage("en", { va: en });
    this.$i18n.mergeLocaleMessage("fr", { va: fr });

    /**
     * Auth store & api dispatcher module injection
     */
    this.$store.registerModule("aside", aside);
    this.$store.registerModule("auth", auth(this.authProvider));
    this.$store.registerModule("api", api(this.$i18n));
    this.$store.registerModule("form", form);
  },
  async mounted() {
    this.$router.beforeEach(async (to, from, next) => {
      if (to.path !== from.path) {
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

        this.removeCurrentResource();
      }
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
      setTitle: "api/setTitle",
      removeCurrentResource: "api/removeCurrentResource"
    }),
    ...mapActions({
      loadUser: "auth/loadUser"
    })
  }
};
</script>
