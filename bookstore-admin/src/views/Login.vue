<template>
  <v-container fluid fill-height id="login-page">
    <v-layout align-center justify-center>
      <v-flex :style="{ 'max-width': '350px' }">
        <v-form ref="form" @submit.prevent="validate">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                label="Login"
                prepend-icon="mdi-account"
                :rules="usernameRules"
                v-model="username"
                required
                ref="usernameInput"
                :error-messages="error"
              ></v-text-field>

              <v-text-field
                label="Password"
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
                x-large
                type="submit"
                >Login</v-btn
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
      usernameRules: [v => !!v || "Email is required"],
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  mounted() {
    this.$refs.usernameInput.focus();
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
  background-color: var(--v-primary-lighten3);
}
</style>
