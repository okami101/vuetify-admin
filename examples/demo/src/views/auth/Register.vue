<template>
  <v-form ref="form" @submit.prevent="validate">
    <v-alert v-if="message" type="error">{{ message }}</v-alert>

    <div class="text-left">
      <router-link class="text-body-2" :to="{ name: 'login' }">
        &lt; {{ $t("auth.sign_in") }}
      </router-link>
    </div>

    <v-text-field
      :label="$t('auth.name')"
      prepend-icon="mdi-account"
      v-model="form.name"
      required
      :error-messages="errorMessages.name"
    ></v-text-field>

    <v-text-field
      :label="$t('auth.email')"
      prepend-icon="mdi-email"
      v-model="form.email"
      required
      :error-messages="errorMessages.email"
    ></v-text-field>

    <v-text-field
      :label="$t('auth.password')"
      type="password"
      v-model="form.password"
      required
      :error-messages="errorMessages.password"
    ></v-text-field>

    <v-text-field
      :label="$t('auth.password_confirmation')"
      type="password"
      v-model="form.password_confirmation"
      required
    ></v-text-field>

    <div class="text-center">
      <v-btn
        :loading="loading"
        color="primary"
        large
        type="submit"
        text
        rounded
      >
        {{ $t("auth.register") }}</v-btn
      >
    </div>
  </v-form>
</template>

<script>
export default {
  props: {
    token: String,
  },
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
      },
      errorMessages: {},
      loading: false,
      message: null,
    };
  },
  methods: {
    async validate() {
      this.errorMessages = {};

      if (this.$refs.form.validate()) {
        this.loading = true;

        try {
          await this.$admin.http.post("/register", this.form);

          this.$router.push("/");
        } catch (e) {
          if (e.errors) {
            this.errorMessages = e.errors;
            return;
          }

          this.message = e.message;
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>
