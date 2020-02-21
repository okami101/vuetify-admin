<template>
  <v-btn
    v-if="item"
    text
    exact
    :to="{
      name: `${$store.state.api.resourceName}_create`,
      query: { source: JSON.stringify(item) }
    }"
    @click.stop="$emit('clone')"
    :color="color"
  >
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ $t("va.actions.clone") }}
  </v-btn>
</template>

<script>
import { mapState } from "vuex";

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
      default: "primary"
    }
  },
  computed: {
    ...mapState({
      resourceName: state => state.api.resourceName
    })
  }
};
</script>
