<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="display-2">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click.native="agree">
          {{ $t("va.confirm.yes") }}
        </v-btn>
        <v-btn color="green darken-1" text @click.native="cancel">
          {{ $t("va.confirm.no") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
    title: null,
    message: null,
  }),
  computed: {
    ...mapState({
      confirm: (state) => state.messages.confirm,
    }),
  },
  watch: {
    confirm(newVal) {
      if (newVal) {
        this.dialog = true;
        this.title = newVal.title;
        this.message = newVal.message;
        return;
      }

      this.dialog = false;
    },
  },
  methods: {
    ...mapActions({
      agree: "messages/agree",
      cancel: "messages/cancel",
    }),
  },
};
</script>
