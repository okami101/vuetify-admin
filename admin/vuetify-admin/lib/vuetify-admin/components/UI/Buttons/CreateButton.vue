<template>
  <v-btn text exact :to="`/${resourceName}/create`" :color="color">
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ $t("va.actions.create") }}
  </v-btn>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CreateButton",
  props: {
    icon: {
      type: String,
      default: "mdi-plus"
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
