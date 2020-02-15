<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="blue darken-3"
    dark
    dense
  >
    <v-app-bar-nav-icon @click.stop="$emit('mini')" />
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">{{ title }}</span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn icon small class="mr-4" :loading="loading" @click="refresh">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon large v-on="on">
          <v-avatar size="32px" item>
            <v-img
              src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
              alt="Vuetify"
          /></v-avatar>
        </v-btn>
      </template>
      <v-card class="mx-auto" width="256" tile>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">{{ name }}</v-list-item-title>
            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-item @click="doLogout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ $t("va.logout") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "AppHeader",
  computed: {
    ...mapState({
      title: state => state.api.title,
      loading: state => state.api.loading
    }),
    ...mapGetters({ name: "auth/name", email: "auth/email" })
  },
  methods: {
    ...mapActions({
      refresh: "api/refresh",
      logout: "auth/logout"
    }),
    async doLogout() {
      await this.logout();
      this.$router.push("/login");
    }
  }
};
</script>
