<template>
  <div>
    <v-row>
      <v-col>
        <form @submit.prevent="updateAccount" class="mb-5">
          <%_ if (material) { _%>
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
          <%_ } else { _%>
          <v-card>
            <v-card-title>
              {{ $t("profile.account") }}
            </v-card-title>
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
          <%_ } _%>
        </form>
      </v-col>
      <v-col>
        <form @submit.prevent="changePassword">
          <%_ if (material) { _%>
          <base-material-card
            color="warning"
            icon="mdi-lock"
            :title="$t('profile.password')"
          >
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    :label="$t('profile.current_password')"
                    type="password"
                    v-model="passwordForm.current_password"
                    required
                    :error-messages="errorMessages.current_password"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :label="$t('profile.password')"
                    type="password"
                    v-model="passwordForm.password"
                    required
                    :error-messages="errorMessages.password"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :label="$t('profile.password_confirmation')"
                    type="password"
                    v-model="passwordForm.password_confirmation"
                    required
                    :error-messages="errorMessages.password_confirmation"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-btn :loading="passwordChanging" color="warning" type="submit">{{
              $t("profile.update")
            }}</v-btn>
          </base-material-card>
          <%_ } else { _%>
          <v-card>
            <v-card-title>
              {{ $t("profile.password") }}
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    :label="$t('profile.current_password')"
                    type="password"
                    v-model="passwordForm.current_password"
                    required
                    :error-messages="errorMessages.current_password"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :label="$t('profile.password')"
                    type="password"
                    v-model="passwordForm.password"
                    required
                    :error-messages="errorMessages.password"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :label="$t('profile.password_confirmation')"
                    type="password"
                    v-model="passwordForm.password_confirmation"
                    required
                    :error-messages="errorMessages.password_confirmation"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn
                :loading="passwordChanging"
                color="warning"
                type="submit"
                >{{ $t("profile.update") }}</v-btn
              >
            </v-card-text>
          </v-card>
          <%_ } _%>
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
        current_password: null,
        password: null,
        password_confirmation: null,
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
      handler(newVal) {
        if (newVal) {
          let { name, email } = newVal;
          this.accountForm = {
            name,
            email,
          };
        }
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
      } catch (e) {
        this.$admin.toast.error(e.message);

        if (e.errors) {
          this.errorMessages = e.errors;
        }
      }
      return false;
    },
    async updateAccount() {
      this.accountUpdating = true;

      try {
        if (
          await this.update(
            "put",
            "/user/profile-information",
            this.accountForm
          )
        ) {
          /**
           * Recheck auth
           */
          this.checkAuth();
          this.$admin.toast.success(this.$t("profile.account_updated"));
        }
      } finally {
        this.accountUpdating = false;
      }
    },
    async changePassword() {
      this.passwordChanging = true;

      try {
        if (await this.update("put", "/user/password", this.passwordForm)) {
          /**
           * Reset
           */
          this.passwordForm = {
            current_password: null,
            password: null,
            password_confirmation: null,
          };
          this.$admin.toast.success(this.$t("profile.password_changed"));
        }
      } finally {
        this.passwordChanging = false;
      }
    },
  },
};
</script>
