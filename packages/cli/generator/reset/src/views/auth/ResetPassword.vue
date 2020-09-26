<template>
  <v-form ref="form" @submit.prevent="validate">
    <v-alert v-if="message" :type="messageType">{{ message }}</v-alert>

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

    <div class="text-left">
      <router-link class="text-body-2" :to="{ name: 'login' }">
        &lt; {{ $t("auth.sign_in") }}
      </router-link>
    </div>

    <div class="text-center">
      <v-btn
        :loading="loading"
        color="primary"
        large
        type="submit"
        text
        rounded
      >
        {{ $t("auth.reset") }}</v-btn
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
        password: null,
        password_confirmation: null,
      },
      errorMessages: {},
      loading: false,
      message: null,
      messageType: null,
    };
  },
  methods: {
    success(message) {
      this.messageType = "success";
      this.message = message;
    },
    error(message) {
      this.messageType = "error";
      this.message = message;
    },
    reset() {
      this.form = {
        password: null,
        password_confirmation: null,
      };
      this.errorMessages = {};
    },
    async validate() {
      this.errorMessages = {};

      if (this.$refs.form.validate()) {
        this.loading = true;

        try {
          let { data } = await this.$admin.http.post("/reset-password", {
            token: this.token,
            email: this.$route.query.email,
            ...this.form,
          });

          this.reset();
          this.success(data.message);
        } catch (e) {
          if (e.errors) {
            this.errorMessages = e.errors;
            return;
          }

          this.error(e.message);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>
