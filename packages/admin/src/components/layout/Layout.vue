<template>
  <v-app>
    <template>
      <!-- @slot Top app bar region, ideal place for VAppBar. -->
      <slot name="app-bar"></slot>
      <!-- @slot Sidebar region, ideal place for VNavigationDrawer. -->
      <slot name="sidebar"></slot>

      <v-content>
        <div class="d-flex flex-column fill-height">
          <!-- @slot Content top header region, ideal place for VBreadcrumbs and/or additional custom messages or important notification as impersonation state, etc. -->
          <slot name="header"></slot>
          <va-messages></va-messages>

          <v-container fluid class="flex">
            <router-view />
          </v-container>

          <!-- @slot Footer region, put here some corporate information and links. -->
          <slot name="footer"></slot>
        </div>
      </v-content>

      <!-- @slot Right aside region, where you can put anything you need. -->
      <slot name="aside"></slot>
    </template>
  </v-app>
</template>

<script>
/**
 * Admin composable component layout with one slot for each region.
 */
export default {};
</script>

<style>
.v-content {
  background-color: #fafafa;
}
</style>
