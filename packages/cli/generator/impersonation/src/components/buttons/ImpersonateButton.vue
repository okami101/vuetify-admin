<template>
  <va-action-button
    v-if="item && user && ![1, user.id].includes(item.id)"
    :item="item"
    @click="impersonate"
    :hide-label="icon"
    :label="$t('users.impersonate')"
    icon="mdi-lock"
    color="warning"
    text
  ></va-action-button>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ImpersonateButton",
  props: {
    item: Object,
    icon: Boolean,
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    async impersonate() {
      try {
        await this.$admin.http.post(`/api/users/${this.item.id}/impersonate`);

        /**
         * Full reload to home
         */
        location.href = process.env.BASE_URL;
      } catch ({ response }) {
        this.$snackbar.error(response.data.message);
      }
    },
  },
};
</script>
