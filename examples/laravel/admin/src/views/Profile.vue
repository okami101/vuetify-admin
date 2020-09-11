<template>
  <div>
    <v-row>
      <v-col>
        <form @submit.prevent="updateAccount" class="mb-5">
          <base-material-card icon="mdi-account" :title="$t('profile.account')">
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
            </v-card-text>
            <v-btn :loading="accountUpdating" color="primary" type="submit">{{
              $t("profile.update")
            }}</v-btn>
          </base-material-card>
        </form>
      </v-col>
      <v-col>
        <form @submit.prevent="changePassword">
          <base-material-card
            color="warning"
            icon="mdi-lock"
            :title="$t('profile.password')"
          >
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
            </v-card-text>
            <v-btn :loading="passwordChanging" color="warning" type="submit">{{
              $t("profile.update")
            }}</v-btn>
          </base-material-card>
        </form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
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
        await this.$admin.http({ method, url, data });

        this.errorMessages = {};
        return true;
      } catch ({ response }) {
        this.$admin.toast.error(response.data.message);

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
        this.$admin.toast.success(this.$t("profile.account_updated"));
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
        this.$admin.toast.success(this.$t("profile.password_changed"));
      }
      this.passwordChanging = false;
    },
  },
};
</script>
