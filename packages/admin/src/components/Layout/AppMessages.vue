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
import Confirm from "./Confirm";
import { mapState } from "vuex";

export default {
  name: "AppMessages",
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
