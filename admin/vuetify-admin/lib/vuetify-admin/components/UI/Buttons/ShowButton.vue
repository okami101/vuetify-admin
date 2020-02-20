<template>
  <v-btn
    v-if="currentResource"
    text
    exact
    :to="`/${resourceName}/${currentResource.id}`"
    @click.stop="$emit('show', currentResource)"
    :color="color"
  >
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ $t("va.actions.show") }}
  </v-btn>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ShowButton",
  props: {
    item: Object,
    icon: {
      type: String,
      default: "mdi-eye"
    },
    color: {
      type: String,
      default: "green"
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
