<template>
  <v-tooltip bottom :disabled="!icon" v-if="show || hasAction('create')">
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
  mixins: [Resource],
  props: {
    icon: Boolean,
    show: Boolean,
    color: {
      type: String,
      default: "success",
    },
  },
  computed: {
    route() {
      if (this.hasAction("create")) {
        return { name: `${this.resource}_create` };
      }
      return null;
    },
  },
};
</script>
