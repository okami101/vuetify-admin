<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        v-if="can(resource, 'list')"
        :icon="icon"
        text
        exact
        :to="`/${resource}`"
        :color="color"
        v-on="on"
      >
        <v-icon small>mdi-view-list</v-icon>
        <span v-if="!icon" class="ml-2">
          {{ $t("va.actions.list") }}
        </span>
      </v-btn>
    </template>
    <span>{{ $t("va.actions.list") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ListButton",
  props: {
    resource: {
      type: String,
      required: true
    },
    icon: Boolean,
    color: {
      type: String,
      default: "warning"
    }
  },
  computed: {
    ...mapGetters({
      can: "api/can"
    })
  }
};
</script>
