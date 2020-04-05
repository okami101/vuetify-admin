<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    :clipped-right="$vuetify.breakpoint.lgAndUp"
    app
    :dark="dark"
    :color="color"
    :dense="dense"
  >
    <v-app-bar-nav-icon @click.stop="$emit('mini')" />
    <v-toolbar-title class="ml-0 pl-4" style="width: 200px;">
      <span class="hidden-sm-and-down">{{ $admin.title }}</span>
    </v-toolbar-title>
    <v-row>
      <v-col
        v-for="(item, i) in headerMenu"
        :key="i"
        class="text-center mb-sm-0 mb-5"
        cols="auto"
      >
        <component
          :is="item.href ? 'a' : 'router-link'"
          :href="item.href"
          :to="item.link"
          class="px-3 white--text link"
          :target="item.href ? '_blank' : '_self'"
          v-text="item.text"
        ></component>
      </v-col>
    </v-row>
    <v-spacer />
    <div>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon small class="mr-5" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>

        <v-list nav dense>
          <v-list-item
            v-for="(item, index) in profileMenu.filter((i) =>
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
      </v-menu>
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

        <v-list nav dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">{{ name }}</v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="(item, index) in profileMenu.filter((i) =>
              $admin.can(i.permissions)
            )"
            :key="index"
            link
            :to="item.link"
            class="mt-2"
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
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "AppHeader",
  props: {
    headerMenu: Array,
    profileMenu: Array,
    color: {
      type: String,
      default: "primary",
    },
    dense: Boolean,
    dark: Boolean,
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

<style scoped>
.link {
  font-size: 0.825rem;
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
