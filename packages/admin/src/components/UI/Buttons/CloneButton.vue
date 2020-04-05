<template>
  <v-tooltip
    bottom
    :disabled="!icon"
    v-if="item && (disableRoute || hasRoute('create'))"
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
        <v-icon small>mdi-content-duplicate</v-icon>
        <span v-if="!icon" class="ml-2">
          {{ $t("va.actions.clone") }}
        </span>
      </v-btn>
    </template>
    <span>{{ $t("va.actions.clone") }}</span>
  </v-tooltip>
</template>

<script>
import Item from "@/mixins/item";

export default {
  name: "CloneButton",
  mixins: [Item],
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
      return {
        name: `${this.resource}_create`,
        query: { source: this.item.id },
      };
    },
  },
};
</script>
