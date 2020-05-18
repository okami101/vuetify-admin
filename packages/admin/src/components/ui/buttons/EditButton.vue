<template>
  <v-tooltip
    bottom
    :disabled="!icon"
    v-if="item && (disableRoute || hasAction('edit'))"
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
        <v-icon small>mdi-pencil</v-icon>
        <span v-if="!icon" class="ml-2">
          {{ $t("va.actions.edit") }}
        </span>
      </v-btn>
    </template>
    <span>{{ $t("va.actions.edit") }}</span>
  </v-tooltip>
</template>

<script>
import Item from "../../../mixins/item";

export default {
  mixins: [Item],
  props: {
    icon: Boolean,
    disableRoute: Boolean,
    color: {
      type: String,
      default: "blue",
    },
  },
  computed: {
    route() {
      if (this.disableRoute) {
        return null;
      }
      return { name: `${this.resource}_edit`, params: { id: this.item.id } };
    },
  },
};
</script>
