<template>
  <v-container fluid fill-height id="login-page">
    <v-layout align-center justify-center>
      <v-flex :style="{ 'max-width': '350px' }">
        <v-form ref="form" @submit.prevent="validate">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>{{ $t("login.title") }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                :label="$t('login.username')"
                prepend-icon="mdi-account"
                :rules="usernameRules"
                v-model="username"
                required
                :error-messages="error"
                autofocus
              ></v-text-field>

              <v-text-field
                :label="$t('login.password')"
                prepend-icon="mdi-lock"
                type="password"
                :rules="passwordRules"
                v-model="password"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                :loading="loading"
                color="primary"
                block
                large
                type="submit"
                >{{ $t("login.sign_in") }}</v-btn
              >
            </v-card-actions>
          </v-card>
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
      error: null,
      loading: false,
      usernameRules: [
        v => !!v || this.$t("va.forms.required_field", { field: "Email" })
      ],
      passwordRules: [
        v => !!v || this.$t("va.forms.required_field", { field: "Password" })
      ]
    };
  },
  methods: {
    ...mapActions({
      login: "auth/login"
    }),
    async validate() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          await this.login({
            username: this.username,
            password: this.password
          });
        } catch (e) {
          this.error = e.toString();
        }
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
#login-page {
  background-color: var(--v-accent-lighten2);
}
</style>
