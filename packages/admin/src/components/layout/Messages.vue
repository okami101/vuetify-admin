<template>
  <div>
    <v-snackbar v-model="snackbar" :color="color">
      {{ text }}
      <v-btn text @click="snackbar = false">
        {{ $t("va.close") }}
      </v-btn>
    </v-snackbar>
    <confirm></confirm>
  </div>
</template>

<script>
import Confirm from "../internal/Confirm";

/**
 * Internal VaMessages system for snackbar/toaster infos and confirm dialog.
 * Integrated with all resource modules for message API calls.
 * Will automatically show `message` error property in case or API errors.
 * Already included in main admin layout, use it only if you need total custom layout.
 */
export default {
  components: {
    Confirm,
  },
  data() {
    return {
      snackbar: false,
      text: null,
      color: null,
    };
  },
  watch: {
    "$store.state.messages.toast"({ color, message }) {
      this.snackbar = true;
      this.text = message;
      this.color = color;
    },
  },
};
</script>
