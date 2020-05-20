<template>
  <v-app>
    <template>
      <!-- @slot Slot for header reagion, ideal place for VAppBar. -->
      <slot name="header"></slot>
      <!-- @slot Slot for sidebar region, ideal place for VNavigationDrawer. -->
      <slot name="sidebar"></slot>

      <v-content>
        <div class="d-flex flex-column fill-height">
          <!-- @slot Slot for content top header, ideal place for VBreadcrumbs. -->
          <slot name="breadcrumbs"></slot>
          <!-- @slot Slot for custom messages or important notification as impersonation state, etc. -->
          <slot name="message"></slot>
          <messages></messages>
          <v-container fluid>
            <router-view />
          </v-container>

          <v-spacer></v-spacer>

          <!-- @slot Slot for footer, put here some corporate informations and links. -->
          <slot name="footer"></slot>
        </div>
      </v-content>

      <!-- @slot Slot for right aside, where you can put anything you need. -->
      <slot name="aside"></slot>
    </template>
  </v-app>
</template>

<script>
import Messages from "../internal/Messages";

/**
 * Admin composable component layout with one slot for each region.
 * @displayName VaLayout
 */
export default {
  components: {
    Messages,
  },
};
</script>

<style>
.v-content {
  background-color: #fafafa;
  min-height: 100vh;
}
</style>
