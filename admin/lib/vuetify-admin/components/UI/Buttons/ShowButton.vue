<template>
  <v-tooltip bottom :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        v-if="item && hasAction('show')"
        :icon="icon"
        text
        exact
        :to="`/${resource}/${item.id}`"
        @click.stop="$emit('show', item)"
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
import Item from "vuetify-admin/mixins/item";

export default {
  name: "ShowButton",
  mixins: [Item],
  props: {
    icon: Boolean,
    color: {
      type: String,
      default: "info",
    },
  },
};
</script>
