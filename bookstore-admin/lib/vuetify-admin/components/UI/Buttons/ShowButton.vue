<template>
  <v-btn
    text
    exact
    :to="`/${$route.meta.resource}/${currentResource.id}`"
    @click="$emit('show', currentResource)"
    :color="color"
  >
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ label }}
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
    label: {
      type: String,
      default: "Show"
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
