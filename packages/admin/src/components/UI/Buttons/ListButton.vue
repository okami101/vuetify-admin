<template>
  <v-tooltip bottom :disabled="!icon" v-if="hasAction('list')">
    <template v-slot:activator="{ on }">
      <v-btn
        :icon="icon"
        text
        exact
        :to="`/${resource}`"
        :color="color"
        v-on="on"
      >
        <v-icon small>mdi-view-list</v-icon>
        <span v-if="!icon" class="ml-2">
          {{ $t("va.actions.list") }}
        </span>
      </v-btn>
    </template>
    <span>{{ $t("va.actions.list") }}</span>
  </v-tooltip>
</template>

<script>
import Resource from "../../../mixins/resource";

export default {
  name: "ListButton",
  mixins: [Resource],
  props: {
    icon: Boolean,
    color: {
      type: String,
      default: "green",
    },
  },
};
</script>
