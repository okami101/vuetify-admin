<template>
  <div>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      {{ snackbarText }}
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

export default {
  name: "AppMessages",
  components: {
    Confirm
  },
  data() {
    return {
      snackbar: false
    };
  },
  created() {
    Vue.prototype.$confirm = (title, message) =>
      this.$refs.confirm.open(title, message);
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
      showSnackbar: state => state.api.showSnackbar,
      snackbarText: state => state.api.snackbarText,
      snackbarColor: state => state.api.snackbarColor
    })
  },
  methods: {
    ...mapMutations({
      closeSnackbar: "api/closeSnackbar"
    })
  }
};
</script>
