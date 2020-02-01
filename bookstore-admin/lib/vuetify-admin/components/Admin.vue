<template>
  <v-app>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="mini = !mini" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">{{ title }}</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
        /></v-avatar>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      :mini-variant="mini"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="(item, index) in items">
          <v-subheader v-if="item.heading && !mini" :key="index">
            {{ item.heading }}
          </v-subheader>
          <v-divider v-else-if="item.divider" :key="index"></v-divider>
          <v-list-group
            v-else-if="item.children"
            :key="index"
            v-model="item.expanded"
            :prepend-icon="item.icon"
            append-icon="mdi-chevron-up"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
              exact
              :to="child.link"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else-if="item.text"
            :key="index"
            link
            exact
            :to="item.link"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Admin",
  props: {
    title: String,
    menu: Array,
    authProvider: Object,
    dataProvider: Object
  },
  data: () => ({
    mini: false,
    items: []
  }),
  watch: {
    menu: {
      handler(newVal) {
        this.items = newVal;
      },
      immediate: true
    }
  }
};
</script>
