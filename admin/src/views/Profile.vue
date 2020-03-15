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
        name: this.user.name,
        email: this.user.email
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
