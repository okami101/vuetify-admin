<template>
  <v-btn
    v-if="item && can(this.resource, 'show')"
    text
    exact
    :to="`/${resource}/${item.id}`"
    @click.stop="$emit('show', item)"
    :color="color"
  >
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ $t("va.actions.show") }}
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ShowButton",
  props: {
    item: Object,
    resource: {
      type: String,
      required: true
    },
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
    ...mapGetters({
      can: "api/can"
    })
  }
};
</script>
