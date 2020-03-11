<template>
  <v-tooltip bottom :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        v-if="item && hasAction('create')"
        :icon="icon"
        text
        exact
        :to="{
          name: `${resource}_create`,
          query: { source: JSON.stringify(item) }
        }"
        @click.stop="$emit('clone', item)"
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
import Item from "vuetify-admin/mixins/item";

export default {
  name: "CloneButton",
  mixins: [Item],
  props: {
    icon: Boolean,
    label: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "success"
    }
  }
};
</script>
