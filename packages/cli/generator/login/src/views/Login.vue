<template>
  <v-app>
    <v-container fluid fill-height id="login-page">
      <v-layout align-center justify-center>
        <v-flex :style="{ 'max-width': '350px' }">
          <v-form ref="form" @submit.prevent="validate">
            <%_ if (material) { _%>
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

                <%_ if (remember) { _%>
                <v-checkbox
                  v-model="form.remember"
                  :label="$t('login.remember')"
                  hide-details
                ></v-checkbox>
                <%_ } _%>
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
            <%_ } else { _%>
            <v-card class="text-center">
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

                <%_ if (remember) { _%>
                <v-checkbox
                  v-model="form.remember"
                  :label="$t('login.remember')"
                  hide-details
                ></v-checkbox>
                <%_ } _%>

                <v-btn
                  :loading="loading"
                  color="primary"
                  large
                  type="submit"
                  text
                  rounded
                  >{{ $t("login.sign_in") }}</v-btn
                >
              </v-card-text>
            </v-card>
            <%_ } _%>
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
        username: null,
        password: null,
        <%_ if (remember) { _%>
        remember: false,
        <%_ } _%>
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
          if (!e.response) {
            this.errorMessages.email = [e.message];
          } else if (e.response.data.errors) {
            this.errorMessages = e.response.data.errors;
          } else if (e.response.data.message) {
            this.errorMessages = { email: [e.response.data.message] };
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
  background-color: var(--v-primary-lighten5);
}
</style>
