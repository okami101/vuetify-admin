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
import { mapState, mapMutations } from "vuex";
import capitalize from "lodash/capitalize";

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
    let snackbarActions = {};
    ["success", "error", "info", "warning"].forEach(action => {
      snackbarActions[action] = text => {
        this.snackbar = true;
        this.text = text;
        this.color = action;
      };
    });
    Vue.prototype.$snackbar = snackbarActions;
  },
  watch: {
    showSnackbar(val) {
      this.snackbar = val;
    },
    snackbarText(val) {
      this.text = val;
    },
    snackbar(val) {
      if (!val) {
        this.closeSnackbar();
      }
    }
  },
  computed: {
    ...mapState({
      showSnackbar: state => state.layout.showSnackbar,
      snackbarText: state => state.layout.snackbarText,
      snackbarColor: state => state.layout.snackbarColor
    })
  },
  methods: {
    ...mapMutations({
      closeSnackbar: "layout/closeSnackbar"
    })
  }
};
</script>
