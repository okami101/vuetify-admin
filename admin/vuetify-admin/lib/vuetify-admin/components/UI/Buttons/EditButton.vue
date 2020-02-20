<template>
  <v-btn
    v-if="currentResource"
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
import { mapState } from "vuex";

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
