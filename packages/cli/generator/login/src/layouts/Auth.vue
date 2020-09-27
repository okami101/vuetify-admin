<template>
  <v-app>
    <v-container fluid fill-height id="login-page">
      <v-layout align-center justify-center>
        <v-flex :style="{ 'max-width': '350px' }">
          <%_ if (material) { _%>
          <base-material-card>
            <template v-slot:heading>
              <div class="display-3 text-center">
                {{ $admin.title }}
              </div>
            </template>
            <v-card-text>
              <div class="text-center mb-4">
                <img src="../assets/logo.svg" width="80" height="80" />
              </div>

              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </v-card-text>
          </base-material-card>
          <%_ } else { _%>
          <v-card class="text-center">
            <v-card-text>
              <img src="../assets/logo.svg" width="80" height="80" />

              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </v-card-text>
          </v-card>
          <%_ } _%>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style scoped>
#login-page {
  background-color: #34495e;
}
</style>
