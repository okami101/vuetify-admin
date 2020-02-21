<template>
  <v-btn
    v-if="currentResource && can('show')"
    text
    exact
    :to="`/${$store.state.api.resourceName}/${currentResource.id}/edit`"
    @click.stop="$emit('edit', currentResource)"
    :color="color"
  >
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ $t("va.actions.edit") }}
  </v-btn>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "EditButton",
  props: {
    item: Object,
    icon: {
      type: String,
      default: "mdi-pencil"
    },
    color: {
      type: String,
      default: "blue"
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
