<template>
  <v-navigation-drawer
    :mini-variant="mini"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
    :dark="dark"
    :color="color"
  >
    <template v-slot:img="props">
      <!-- @slot Slot for full customizable image background. -->
      <slot name="img" v-bind="props"></slot>
    </template>
    <v-list dense>
      <template v-for="(item, index) in menu">
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
            v-for="(child, i) in item"
            :key="i"
            link
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
        <v-list-item v-else-if="item.text" :key="index" link :to="item.link">
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
</template>

<script>
/**
 * Default customizable admin VNavigationDrawer with full hierarchical menu and minimizable.
 * @displayName VaSidebar
 */
export default {
  props: {
    /**
     * Main place for side menu, support hierarchical structure, MDI icons, heading and dividers.
     * Best place for `src/_navs.js` file import.
     */
    menu: {
      type: Array,
      default: () => [],
    },
    /**
     * Minimize the sidebar and show only icons.
     */
    mini: Boolean,
    /**
     * Main color of VNavigationDrawer.
     */
    color: {
      type: String,
      default: "white",
    },
    /**
     * Apply dark theme variant for VNavigationDrawer
     */
    dark: Boolean,
  },
};
</script>
