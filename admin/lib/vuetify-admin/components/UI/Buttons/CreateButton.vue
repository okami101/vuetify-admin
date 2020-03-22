<template>
  <v-tooltip bottom :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        v-if="hasAction('create')"
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
import Resource from "vuetify-admin/mixins/resource";

export default {
  name: "CreateButton",
  mixins: [Resource],
  props: {
    icon: Boolean,
    color: {
      type: String,
      default: "success",
    },
  },
};
</script>
