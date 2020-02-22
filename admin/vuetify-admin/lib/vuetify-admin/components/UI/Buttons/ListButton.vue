<template>
  <v-btn text exact :to="`/${$store.state.api.resourceName}`" :color="color">
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ $t("va.actions.list") }}
  </v-btn>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ListButton",
  props: {
    icon: {
      type: String,
      default: "mdi-view-list"
    },
    color: {
      type: String,
      default: "warning"
    }
  },
  computed: {
    ...mapState({
      resourceName: state => state.api.resourceName,
      resource: state => state.api.resource
    })
  }
};
</script>
