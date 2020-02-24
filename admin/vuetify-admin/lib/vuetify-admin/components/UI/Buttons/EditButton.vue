<template>
  <v-btn
    v-if="item && can('show')"
    text
    exact
    :to="`/${resourceName}/${item.id}/edit`"
    @click.stop="$emit('edit', item)"
    :color="color"
  >
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ $t("va.actions.edit") }}
  </v-btn>
</template>

<script>
import { mapState, mapGetters } from "vuex";

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
    ...mapGetters({
      can: "api/can"
    }),
    ...mapState({
      resourceName: state => state.api.resourceName
    })
  }
};
</script>
