<template>
  <v-btn
    v-if="currentResource"
    text
    exact
    :to="`/${$store.state.api.resourceName}/${currentResource.id}`"
    @click="$emit('show', currentResource)"
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
    resource: Object,
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
      apiResource: state => state.api.resource
    }),
    currentResource() {
      return this.resource || this.apiResource;
    }
  }
};
</script>
