<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        v-if="item && can(resource, 'show')"
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
import { mapGetters } from "vuex";

export default {
  name: "ShowButton",
  props: {
    item: Object,
    resource: {
      type: String,
      required: true
    },
    icon: Boolean,
    color: {
      type: String,
      default: "green"
    }
  },
  computed: {
    ...mapGetters({
      can: "api/can"
    })
  }
};
</script>
