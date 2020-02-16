<template>
  <v-btn :loading="saving" color="primary" type="submit">
    <v-icon class="mr-2">mdi-floppy</v-icon>
    {{ $t("va.save") }}
  </v-btn>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SaveButton",
  props: {
    icon: {
      type: String,
      default: "mdi-floppy"
    },
    color: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    ...mapState({
      saving: state => state.form.saving
    })
  }
};
</script>
