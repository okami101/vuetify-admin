<template>
  <v-btn
    v-if="can(this.resource, 'create')"
    text
    exact
    :to="`/${resource}/create`"
    :color="color"
  >
    <v-icon small>mdi-plus</v-icon>
    <span v-if="!icon" class="ml-2">
      {{ $t("va.actions.create") }}
    </span>
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CreateButton",
  props: {
    resource: {
      type: String,
      required: true
    },
    icon: Boolean,
    color: {
      type: String,
      default: "success"
    }
  },
  computed: {
    ...mapGetters({
      can: "api/can"
    })
  }
};
</script>
