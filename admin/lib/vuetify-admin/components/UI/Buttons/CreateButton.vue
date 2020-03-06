<template>
  <v-tooltip bottom :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        v-if="can(resource, 'create')"
        text
        exact
        :to="`/${resource}/create`"
        :color="color"
        v-on="on"
      >
        <v-icon small>mdi-plus</v-icon>
        <span v-if="!icon" class="ml-2">
          {{ $t("va.actions.create") }}
        </span>
      </v-btn>
    </template>
    <span>{{ $t("va.actions.create") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CreateButton",
  props: {
    resource: {
      type: String,
      required: true
    },
    icon: Boolean,
    color: {
      type: String,
      default: "success"
    }
  },
  computed: {
    ...mapGetters({
      can: "api/can"
    })
  }
};
</script>
