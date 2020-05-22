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
import { mapState } from "vuex";

/**
 * Internal VaMessages system for snackbar/toaster infos and confirm dialog.
 * Integrated with all resource modules for message API calls.
 * Already included in main admin layout, use it only if you need total custom layout.
 * @displayName VaMessages
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
  computed: {
    ...mapState({
      toast: (state) => state.messages.toast,
    }),
  },
  watch: {
    toast({ color, message }) {
      this.snackbar = true;
      this.text = message;
      this.color = color;
    },
  },
};
</script>
