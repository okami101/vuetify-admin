<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="display-1">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          text
          @click.native="$store.dispatch('messages/agree')"
        >
          {{ $t("va.confirm.yes") }}
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click.native="$store.dispatch('messages/cancel')"
        >
          {{ $t("va.confirm.no") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    title: null,
    message: null,
  }),
  watch: {
    "$store.state.messages.confirm"(newVal) {
      if (newVal) {
        this.dialog = true;
        this.title = newVal.title;
        this.message = newVal.message;
        return;
      }

      this.dialog = false;
    },
  },
};
</script>
