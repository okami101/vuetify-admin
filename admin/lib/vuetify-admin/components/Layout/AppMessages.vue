<template>
  <div>
    <v-snackbar v-model="snackbar" :color="color">
      {{ text }}
      <v-btn text @click="snackbar = false">
        {{ $t("va.close") }}
      </v-btn>
    </v-snackbar>
    <confirm ref="confirm"></confirm>
  </div>
</template>

<script>
import Vue from "vue";
import Confirm from "./Confirm";

export default {
  name: "AppMessages",
  components: {
    Confirm
  },
  data() {
    return {
      snackbar: false,
      text: null,
      color: null
    };
  },
  created() {
    /**
     * Global confirm dialog function
     */
    Vue.prototype.$confirm = (title, message) =>
      this.$refs.confirm.open(title, message);

    /**
     * Global toaster function
     */
    Vue.prototype.$snackbar = [
      "success",
      "error",
      "info",
      "warning",
      "message"
    ].reduce(
      (o, action) => ({
        ...o,
        [action]: text => {
          this.snackbar = true;
          this.text = text;
          this.color = action !== "message" ? action : null;
        }
      }),
      {}
    );
  }
};
</script>
