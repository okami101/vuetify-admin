<template>
  <v-btn
    v-if="can(this.resource, 'create')"
    text
    exact
    :to="`/${resource}/create`"
    :color="color"
  >
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ $t("va.actions.create") }}
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
    icon: {
      type: String,
      default: "mdi-plus"
    },
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
