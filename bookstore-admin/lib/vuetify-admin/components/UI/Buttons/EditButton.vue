<template>
  <v-btn
    v-if="currentResource"
    text
    exact
    :to="`/${$route.meta.resource}/${currentResource.id}/edit`"
    @click="$emit('edit', currentResource)"
    :color="color"
  >
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ label }}
  </v-btn>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "EditButton",
  props: {
    resource: Object,
    icon: {
      type: String,
      default: "mdi-pencil"
    },
    label: {
      type: String,
      default: "Edit"
    },
    color: {
      type: String,
      default: "orange"
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
