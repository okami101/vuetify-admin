<template>
  <v-alert type="warning" text v-if="user && user.impersonate">
    <i18n path="users.logged_as">
      <strong>{{ user.name }}</strong>
      <a href="javascript:void(0)" @click="stopImpersonate">{{ $t("here") }}</a>
    </i18n>
  </v-alert>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ImpersonateMessage",
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    async stopImpersonate() {
      try {
        await this.$admin.http.post("/api/users/stopImpersonate");

        /**
         * Full reload to home
         */
        location.href = process.env.BASE_URL;
      } catch ({ response }) {
        this.$admin.toast.error(response.data.message);
      }
    },
  },
};
</script>
