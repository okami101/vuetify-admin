<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    :clipped-right="$vuetify.breakpoint.lgAndUp"
    app
    color="primary"
    dark
    dense
  >
    <v-app-bar-nav-icon @click.stop="$emit('mini')" />
    <v-toolbar-title style="width: 300px;" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">{{ $route.meta.title }}</span>
    </v-toolbar-title>
    <v-spacer />
    <div>
      <v-btn
        icon
        small
        class="mr-5"
        :loading="loading"
        @click="refresh($route.meta.resource)"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon small v-on="on">
            <v-icon>mdi-account-circle</v-icon>
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
            <v-list-item
              v-for="(item, index) in menu.filter((i) =>
                $admin.can(i.permissions)
              )"
              :key="index"
              link
              :to="item.link"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout()">
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
    </div>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "AppHeader",
  props: {
    menu: Array,
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.loading,
    }),
    ...mapGetters({ name: "auth/getName", email: "auth/getEmail" }),
  },
  methods: {
    ...mapActions({
      refresh: "api/refresh",
      logout: "auth/logout",
    }),
  },
};
</script>
