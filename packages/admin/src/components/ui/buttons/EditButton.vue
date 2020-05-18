<template>
  <v-tooltip
    bottom
    :disabled="!icon"
    v-if="item && (show || hasAction('edit'))"
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
    show: Boolean,
    color: {
      type: String,
      default: "blue",
    },
  },
  computed: {
    route() {
      if (this.hasAction("edit")) {
        return { name: `${this.resource}_edit`, params: { id: this.item.id } };
      }
      return null;
    },
  },
};
</script>
