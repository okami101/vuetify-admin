<template>
  <v-form ref="form" @submit.prevent="validate">
    <v-alert v-if="message" :type="messageType">{{ message }}</v-alert>

    <v-text-field
      :label="$t('auth.email')"
      prepend-icon="mdi-account"
      v-model="form.email"
      required
      :error-messages="errorMessages.email"
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
        {{ $t("auth.send") }}</v-btn
      >
    </div>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: null,
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
    async validate() {
      this.errorMessages = {};

      if (this.$refs.form.validate()) {
        this.loading = true;

        try {
          let { data } = await this.$admin.http.post(
            "/forgot-password",
            this.form
          );

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
