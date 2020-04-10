<template>
  <v-tooltip
    bottom
    :disabled="!icon"
    v-if="disableRoute || hasAction('create')"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        text
        exact
        :to="route"
        @click.stop="$emit('click')"
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
import Resource from "../../../mixins/resource";

export default {
  name: "CreateButton",
  mixins: [Resource],
  props: {
    icon: Boolean,
    disableRoute: Boolean,
    color: {
      type: String,
      default: "success",
    },
  },
  computed: {
    route() {
      if (this.disableRoute) {
        return null;
      }
      return `/${this.resource}/create`;
    },
  },
};
</script>
