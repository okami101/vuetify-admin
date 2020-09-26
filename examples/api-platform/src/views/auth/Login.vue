<template>
  <v-form ref="form" @submit.prevent="validate">
    <v-text-field
      :label="$t('auth.username')"
      prepend-icon="mdi-account"
      v-model="form.username"
      required
      :error-messages="errorMessages.email"
    ></v-text-field>

    <v-text-field
      :label="$t('auth.password')"
      prepend-icon="mdi-lock"
      type="password"
      v-model="form.password"
      required
    ></v-text-field>

    <v-btn
      :loading="loading"
      color="primary"
      large
      type="submit"
      text
      rounded
      >{{ $t("auth.sign_in") }}</v-btn
    >
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        username: "admin@example.com",
        password: "admin",
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
