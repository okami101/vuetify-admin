<template>
  <div>
    <v-row>
      <v-col>
        <form @submit.prevent="update" class="mb-5">
          <v-card>
            <v-card-title>{{ $t("profile.account") }}</v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    :label="$t('profile.name')"
                    v-model="accountForm.name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :label="$t('profile.email')"
                    v-model="accountForm.email"
                    required
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
                    v-model="passwordForm.oldPassword"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :label="$t('profile.new_password')"
                    type="password"
                    v-model="passwordForm.newPassword"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :label="$t('profile.confirm_password')"
                    type="password"
                    v-model="passwordForm.newPasswordConfirmation"
                    required
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
        email: null
      },
      passwordForm: {
        oldPassword: null,
        newPassword: null,
        newPasswordConfirmation: null
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  watch: {
    user: {
      handler({ name, email }) {
        this.accountForm = {
          name,
          email
        };
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      checkAuth: "auth/checkAuth"
    }),
    async update() {
      this.accountUpdating = true;
      await this.$axios.patch("/api/account/update", this.accountForm);
      this.accountUpdating = false;

      /**
       * Recheck auth
       */
      this.checkAuth();
      this.$snackbar.success(this.$t("profile.account_updated"));
    },
    async changePassword() {
      this.passwordChanging = true;
      await this.$axios.patch("/api/account/password", this.passwordForm);
      this.passwordChanging = false;

      /**
       * Reset
       */
      this.passwordForm = {
        oldPassword: null,
        newPassword: null,
        newPasswordConfirmation: null
      };
      this.$snackbar.success(this.$t("profile.password_changed"));
    }
  }
};
</script>
