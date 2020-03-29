<template>
  <va-action-button
    v-if="item && ![1, user.id].includes(item.id)"
    :item="item"
    @click="impersonate"
    :show-label="!icon"
    :label="$t('users.impersonate')"
    icon="mdi-lock"
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
        await this.$axios.post(`/api/users/${this.item.id}/impersonate`);

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
