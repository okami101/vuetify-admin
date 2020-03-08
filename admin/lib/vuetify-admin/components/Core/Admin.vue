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
import Vue from "vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import layout from "vuetify-admin/store/layout";
import aside from "vuetify-admin/store/aside";
import auth from "vuetify-admin/store/auth";
import api from "vuetify-admin/store/api";
import form from "vuetify-admin/store/form";
import isEmpty from "lodash/isEmpty";
import AppLayout from "vuetify-admin/components/Layout/AppLayout";
import resourceCrudModule from "vuetify-admin/store/resource";
import resourceCrudRoutes from "vuetify-admin/router/resource";

import en from "vuetify-admin/locales/en.json";
import fr from "vuetify-admin/locales/fr.json";

export default {
  name: "Admin",
  components: {
    AppLayout
  },
  props: {
    title: String,
    menu: Array,
    authProvider: Object,
    dataProvider: Object,
    resources: {
      type: Array,
      default: () => []
    }
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
    ...mapGetters({
      permissions: "auth/getPermissions"
    }),
    getResources() {
      return this.resources
        .map(r => {
          return typeof r === "string"
            ? {
                name: r
              }
            : r;
        })
        .map(r => {
          return {
            ...r,
            actions: this.getResourceActions(r)
          };
        });
    },
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
    this.$store.registerModule("layout", layout(this.$i18n));
    this.$store.registerModule("aside", aside);
    this.$store.registerModule("api", api);
    this.$store.registerModule("auth", auth(this.authProvider, this.$router));
    this.$store.registerModule("form", form);

    /**
     * Add API resources modules dynamically
     */
    this.getResources.forEach(r =>
      this.$store.registerModule(
        r.name,
        resourceCrudModule(this.dataProvider, r.name, r.actions)
      )
    );

    /**
     * Add resources routes dynamically
     */
    this.$router.addRoutes(
      this.getResources.map(r =>
        resourceCrudRoutes(this.$store, this.$i18n, r.name, r.actions)
      )
    );

    /**
     * Permissions helper & directive
     */
    const can = permissions => {
      return !isEmpty(
        (Array.isArray(permissions) ? permissions : [permissions]).filter(
          p => -1 !== this.permissions.indexOf(p)
        )
      );
    };

    Vue.directive("can", (el, binding, vnode) => {
      if (!can(binding.value)) {
        // replace HTMLElement with comment node
        const comment = document.createComment("");
        vnode.elm = comment;
        vnode.text = "";
        vnode.isComment = true;

        if (el.parentNode) {
          el.parentNode.replaceChild(comment, el);
        }
      }
    });
    Vue.prototype.$can = can;
  },
  async mounted() {
    this.$router.beforeEach(async (to, from, next) => {
      if (to.path !== from.path) {
        /**
         * Check and reload authenticated user with permissions
         * after each navigation
         */
        if (to.name !== "login") {
          await this.checkAuth();
        }

        this.closeAside();
      }

      next();
    });

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
      setTitle: "layout/setTitle",
      closeAside: "aside/close"
    }),
    ...mapActions({
      checkAuth: "auth/checkAuth"
    }),
    getResourceActions(resource) {
      return ["list", "show", "create", "edit", "delete"].filter(a => {
        if ((resource.only || []).length) {
          return resource.only.includes(a);
        }

        if ((resource.except || []).length) {
          return !resource.except.includes(a);
        }

        return true;
      });
    }
  }
};
</script>
