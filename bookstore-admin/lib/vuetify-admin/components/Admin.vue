<template>
  <v-app>
    <AppLayout v-if="user" :title="title" :menu="menu"></AppLayout>
    <v-content v-else-if="authChecked">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import auth from "../store/auth";
import api from "../store/api";
import AppLayout from "./Layouts/AppLayout";
import loginPage from "../views/Login";

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
      authChecked: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  created() {
    /**
     * Auth & data store modules injection
     */
    this.$store.registerModule("auth", auth(this.authProvider, this.$router));
    this.$store.registerModule("api", api(this.dataProvider));

    /**
     * Route login injection
     */
    this.$router.addRoutes([
      {
        path: "/login",
        name: "login",
        component: loginPage
      }
    ]);
  },
  async mounted() {
    /**
     * Load authenticated user
     */
    await this.$store.dispatch("auth/loadUser");
    this.authChecked = true;
  }
};
</script>
