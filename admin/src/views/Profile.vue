<template>
  <div>
    <p>This is my profile page</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
    async update() {
      this.accountUpdating = true;
      await this.$axios.patch("/account/password", this.accountForm);
      this.accountUpdating = false;
    },
    async changePassword() {
      this.passwordChanging = true;
      await this.$axios.patch("/account/update", this.passwordForm);
      this.passwordChanging = false;
    }
  }
};
</script>
