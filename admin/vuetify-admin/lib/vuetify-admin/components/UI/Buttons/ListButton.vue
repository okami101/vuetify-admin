<template>
  <v-btn text exact :to="`/${$store.state.api.resourceName}`" :color="color">
    <v-icon small class="mr-2">{{ icon }}</v-icon>
    {{ $t("va.actions.list") }}
  </v-btn>
</template>

<script>
export default {
  name: "ListButton",
  props: {
    icon: {
      type: String,
      default: "mdi-view-list"
    },
    color: {
      type: String,
      default: "blue"
    }
  }
};
</script>
