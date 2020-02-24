<template>
  <v-btn
    v-if="can(this.resource, 'list')"
    text
    exact
    :to="`/${resource}`"
    :color="color"
  >
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ $t("va.actions.list") }}
  </v-btn>
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
    icon: {
      type: String,
      default: "mdi-view-list"
    },
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
