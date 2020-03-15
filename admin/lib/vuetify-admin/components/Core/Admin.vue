<template>
  <v-app>
    <v-content v-if="unauthenticatedRoute">
      <router-view></router-view>
    </v-content>
    <app-layout
      v-else-if="user"
      :sidebarMenu="sidebarMenu"
      :profileMenu="profileMenu"
    ></app-layout>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import AppLayout from "vuetify-admin/components/Layout/AppLayout";

export default {
  name: "Admin",
  components: {
    AppLayout
  },
  props: {
    sidebarMenu: Array,
    profileMenu: Array
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    unauthenticatedRoute() {
      return this.$route.name === "login";
    }
  }
};
</script>
