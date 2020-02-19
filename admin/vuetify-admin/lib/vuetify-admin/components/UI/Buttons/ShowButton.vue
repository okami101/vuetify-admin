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
    item: Object,
    icon: {
      type: String,
      default: "mdi-eye"
    },
    color: {
      type: String,
      default: "blue"
    }
  },
  computed: {
    ...mapState({
      apiResource: state => state.api.resource
    }),
    currentResource() {
      return this.item || this.apiResource;
    }
  }
};
</script>
