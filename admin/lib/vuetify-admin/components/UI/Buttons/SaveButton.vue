<template>
  <v-tooltip bottom :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        :icon="icon"
        :loading="saving"
        color="primary"
        type="submit"
        v-on="on"
      >
        <v-icon>mdi-floppy</v-icon>
        <span v-if="!icon" class="ml-2">
          {{ $t("va.actions.save") }}
        </span>
      </v-btn>
    </template>
    <span>{{ $t("va.actions.save") }}</span>
  </v-tooltip>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SaveButton",
  props: {
    icon: Boolean,
    color: {
      type: String,
      default: "primary"
    },
    saving: Boolean
  }
};
</script>
