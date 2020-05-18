<template>
  <v-app>
    <template>
      <slot name="header"></slot>
      <slot name="sidebar"></slot>

      <v-content>
        <div class="d-flex flex-column fill-height">
          <slot name="breadcrumbs"></slot>
          <slot name="message"></slot>
          <va-messages></va-messages>
          <v-container fluid>
            <router-view />
          </v-container>

          <v-spacer></v-spacer>

          <slot name="footer"></slot>
        </div>
      </v-content>

      <slot name="aside">
        <va-aside></va-aside>
      </slot>
    </template>
  </v-app>
</template>

<style>
.v-content {
  background-color: #fafafa;
  min-height: 100vh;
}
</style>
