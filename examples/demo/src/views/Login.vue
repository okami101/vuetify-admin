<template>
  <v-app>
    <v-container fluid fill-height id="login-page">
      <v-layout align-center justify-center>
        <v-flex :style="{ 'max-width': '350px' }">
          <v-form ref="form" @submit.prevent="validate">
            <base-material-card class="text-center">
              <template v-slot:heading>
                <div class="display-3 text-center">
                  {{ $admin.title }}
                </div>
              </template>
              <v-card-text>
                <img src="../assets/logo.svg" width="80" height="80" />

                <v-text-field
                  :label="$t('login.username')"
                  prepend-icon="mdi-account"
                  v-model="form.username"
                  required
                  :error-messages="errorMessages.email"
                ></v-text-field>

                <v-text-field
                  :label="$t('login.password')"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="form.password"
                  required
                ></v-text-field>

                <v-checkbox
                  v-model="form.remember"
                  :label="$t('login.remember')"
                  hide-details
                ></v-checkbox>
              </v-card-text>

              <v-btn
                :loading="loading"
                color="primary"
                large
                type="submit"
                text
                rounded
              >
                {{ $t("login.sign_in") }}</v-btn
              >
            </base-material-card>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        username: "demo@example.com",
        password: "password",
        remember: false,
      },
      errorMessages: {},
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
    async validate() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          await this.login(this.form);
        } catch (e) {
          if (e.errors) {
            this.errorMessages = e.errors;
          } else {
            this.errorMessages = { email: [e.message] };
          }
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style scoped>
#login-page {
  background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
    ),
    url(../assets/splash.jpg);
  background-position: center;
  background-size: cover;
}
</style>
