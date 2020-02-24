<template>
  <v-btn
    v-if="item && can(this.resource, 'show')"
    text
    exact
    :to="`/${resource}/${item.id}/edit`"
    @click.stop="$emit('edit', item)"
    :color="color"
  >
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ $t("va.actions.edit") }}
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "EditButton",
  props: {
    item: Object,
    resource: {
      type: String,
      required: true
    },
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
    })
  }
};
</script>
