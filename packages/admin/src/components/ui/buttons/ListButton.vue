<template>
  <v-tooltip bottom :disabled="!icon" v-if="hasAction('list')">
    <template v-slot:activator="{ on }">
      <v-btn
        :icon="icon"
        text
        exact
        :to="{ name: `${resource}_list` }"
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
