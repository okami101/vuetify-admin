<template>
  <v-btn
    v-if="currentResource && can('create')"
    text
    exact
    :to="{
      name: `${resourceName}_create`,
      query: { source: JSON.stringify(currentResource) }
    }"
    @click.stop="$emit('clone')"
    :color="color"
  >
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ $t("va.actions.clone") }}
  </v-btn>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "CloneButton",
  props: {
    item: Object,
    icon: {
      type: String,
      default: "mdi-content-duplicate"
    },
    color: {
      type: String,
      default: "success"
    }
  },
  computed: {
    ...mapGetters({
      can: "api/can"
    }),
    ...mapState({
      resourceName: state => state.api.resourceName,
      resource: state => state.api.resource
    }),
    currentResource() {
      return this.item || this.resource;
    }
  }
};
</script>
