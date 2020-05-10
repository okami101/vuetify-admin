<template>
  <v-tooltip bottom :disabled="showLabel">
    <template v-slot:activator="{ on }">
      <v-btn
        :icon="!showLabel"
        :text="text"
        :to="to"
        @click="$emit('click', item)"
        :color="color"
        v-on="on"
      >
        <v-icon small>{{ icon }}</v-icon>
        <span v-if="showLabel" class="ml-2">
          {{ label }}
        </span>
      </v-btn>
    </template>
    <span>{{ label }}</span>
  </v-tooltip>
</template>

<script>
import Item from "../../../mixins/item";

export default {
  name: "ActionButton",
  mixins: [Item],
  props: {
    icon: String,
    label: {
      type: String,
      required: true,
    },
    showLabel: Boolean,
    color: {
      type: String,
      default: "primary",
    },
    to: [String, Object],
    text: Boolean,
  },
};
</script>
