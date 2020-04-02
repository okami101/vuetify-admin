<template>
  <v-container fluid fill-height id="login-page">
    <v-layout align-center justify-center>
      <v-flex :style="{ 'max-width': '350px' }">
        <v-form ref="form" @submit.prevent="validate">
          <base-material-card class="text-center">
            <template v-slot:heading>
              <div class="display-3 text-center">
                {{ $t("login.title") }}
              </div>
            </template>
            <v-card-text>
              <v-text-field
                :label="$t('login.username')"
                prepend-icon="mdi-account"
                v-model="username"
                required
                :error-messages="errorMessages.email"
                autofocus
              ></v-text-field>

              <v-text-field
                :label="$t('login.password')"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                required
              ></v-text-field>
            </v-card-text>

            <v-btn
              :loading="loading"
              color="primary"
              large
              type="submit"
              text
              rounded
              >{{ $t("login.sign_in") }}</v-btn
            >
          </base-material-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: null,
      password: null,
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
          await this.login({
            username: this.username,
            password: this.password,
          });
        } catch ({ response }) {
          if (response.data.errors) {
            this.errorMessages = response.data.errors;
          }
        }
        this.loading = false;
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
    url(/splash.jpg);
  background-position: center;
  background-size: cover;
}
</style>
