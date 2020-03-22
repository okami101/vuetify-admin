<template>
  <div>
    <v-row>
      <v-col>
        <form @submit.prevent="updateAccount" class="mb-5">
          <v-card>
            <v-card-title>{{ $t("profile.account") }}</v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    :label="$t('profile.name')"
                    v-model="accountForm.name"
                    required
                    :error-messages="errorMessages.name"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :label="$t('profile.email')"
                    v-model="accountForm.email"
                    type="email"
                    required
                    :error-messages="errorMessages.email"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn :loading="accountUpdating" color="primary" type="submit">{{
                $t("profile.update")
              }}</v-btn>
            </v-card-text>
          </v-card>
        </form>
      </v-col>
      <v-col>
        <form @submit.prevent="changePassword">
          <v-card>
            <v-card-title>{{ $t("profile.password") }}</v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    :label="$t('profile.old_password')"
                    type="password"
                    v-model="passwordForm.old_password"
                    required
                    :error-messages="errorMessages.old_password"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :label="$t('profile.new_password')"
                    type="password"
                    v-model="passwordForm.new_password"
                    required
                    :error-messages="errorMessages.new_password"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :label="$t('profile.confirm_password')"
                    type="password"
                    v-model="passwordForm.new_password_confirmation"
                    required
                    :error-messages="errorMessages.new_password_confirmation"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn
                :loading="passwordChanging"
                color="primary"
                type="submit"
                >{{ $t("profile.update") }}</v-btn
              >
            </v-card-text>
          </v-card>
        </form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AppHeader",
  data() {
    return {
      accountUpdating: false,
      passwordChanging: false,
      accountForm: {
        name: null,
        email: null,
      },
      passwordForm: {
        old_password: null,
        new_password: null,
        new_password_confirmation: null,
      },
      errorMessages: {},
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  watch: {
    user: {
      handler({ name, email }) {
        this.accountForm = {
          name,
          email,
        };
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions({
      checkAuth: "auth/checkAuth",
    }),
    async update(method, url, data) {
      try {
        await this.$axios({ method, url, data });

        this.errorMessages = {};
        return true;
      } catch ({ response }) {
        this.$snackbar.error(response.data.message);

        if (response.data.errors) {
          this.errorMessages = response.data.errors;
        }
      }
      return false;
    },
    async updateAccount() {
      this.accountUpdating = true;
      if (await this.update("patch", "/api/account/update", this.accountForm)) {
        /**
         * Recheck auth
         */
        this.checkAuth();
        this.$snackbar.success(this.$t("profile.account_updated"));
      }
      this.accountUpdating = false;
    },
    async changePassword() {
      this.passwordChanging = true;
      if (
        await this.update("patch", "/api/account/password", this.passwordForm)
      ) {
        /**
         * Reset
         */
        this.passwordForm = {
          oldPassword: null,
          newPassword: null,
          newPasswordConfirmation: null,
        };
        this.$snackbar.success(this.$t("profile.password_changed"));
      }
      this.passwordChanging = false;
    },
  },
};
</script>
