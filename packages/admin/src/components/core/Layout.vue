<template>
  <v-app>
    <template>
      <!-- @slot Slot for top app bar region, ideal place for VAppBar. -->
      <slot name="app-bar"></slot>
      <!-- @slot Slot for sidebar region, ideal place for VNavigationDrawer. -->
      <slot name="sidebar"></slot>

      <v-content>
        <div class="d-flex flex-column fill-height">
          <!-- @slot Slot for content top header, ideal place for VBreadcrumbs and/or additional custom messages or important notification as impersonation state, etc. -->
          <slot name="header"></slot>
          <va-messages></va-messages>
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
/**
 * Admin composable component layout with one slot for each region.
 * @displayName VaLayout
 */
export default {};
</script>

<style>
.v-content {
  background-color: #fafafa;
}
</style>
