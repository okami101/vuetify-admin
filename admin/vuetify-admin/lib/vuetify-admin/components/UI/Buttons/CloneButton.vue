<template>
  <v-btn
    v-if="item && can(this.resource, 'create')"
    text
    exact
    :to="{
      name: `${resource}_create`,
      query: { source: JSON.stringify(item) }
    }"
    @click.stop="$emit('clone', item)"
    :color="color"
  >
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ $t("va.actions.clone") }}
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CloneButton",
  props: {
    item: Object,
    resource: {
      type: String,
      required: true
    },
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
    })
  }
};
</script>
