<template>
  <v-tooltip bottom :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        v-if="item && hasAction('edit')"
        :icon="icon"
        text
        exact
        :to="`/${resource}/${item.id}/edit`"
        @click.stop="$emit('edit', item)"
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
import Item from "vuetify-admin/mixins/item";

export default {
  name: "EditButton",
  mixins: [Item],
  props: {
    icon: Boolean,
    label: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "blue"
    }
  }
};
</script>
