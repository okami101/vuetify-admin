<template>
  <v-app>
    <app-layout v-if="user" :title="title" :menu="menu"></app-layout>
    <v-content v-else-if="authChecked">
      <router-view></router-view>
    </v-content>
    <slot></slot>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import auth from "../../store/auth";
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
     * Auth store module injection
     */
    this.$store.registerModule("auth", auth(this.authProvider, this.$router));
  },
  async mounted() {
    /**
     * Load authenticated user
     */
    await this.loadUser();
    this.authChecked = true;
  },
  methods: {
    ...mapActions({
      loadUser: "auth/loadUser"
    })
  },
  watch: {
    async $route(to, from) {
      /**
       * Check and reload authenticated user with permissions
       * after each navigation
       */
      await this.loadUser();
    }
  }
};
</script>
