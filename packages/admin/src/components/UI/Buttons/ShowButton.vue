<template>
  <v-tooltip
    bottom
    :disabled="!icon"
    v-if="item && (disableRoute || hasRoute('show'))"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        :icon="icon"
        text
        exact
        :to="route"
        @click.stop="$emit('click', item)"
        :color="color"
        v-on="on"
      >
        <v-icon small>mdi-eye</v-icon>
        <span v-if="!icon" class="ml-2">
          {{ $t("va.actions.show") }}
        </span>
      </v-btn>
    </template>
    <span>{{ $t("va.actions.show") }}</span>
  </v-tooltip>
</template>

<script>
import Item from "../../../mixins/item";

export default {
  name: "ShowButton",
  mixins: [Item],
  props: {
    icon: Boolean,
    disableRoute: Boolean,
    color: {
      type: String,
      default: "info",
    },
  },
  computed: {
    route() {
      if (this.disableRoute) {
        return null;
      }
      return `/${this.resource}/${this.item.id}`;
    },
  },
};
</script>
