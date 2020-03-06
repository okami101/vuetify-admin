<template>
  <v-tooltip bottom :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        v-if="item && can(resource, 'show')"
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
import { mapGetters } from "vuex";

export default {
  name: "EditButton",
  props: {
    item: Object,
    resource: {
      type: String,
      required: true
    },
    icon: Boolean,
    label: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "blue"
    }
  },
  computed: {
    ...mapGetters({
      can: "api/can"
    })
  }
};
</script>
