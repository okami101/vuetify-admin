<template>
  <v-tooltip bottom :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        :type="type"
        text
        @click.stop="$emit('click')"
        :color="color"
        v-on="on"
      >
        <v-icon small>mdi-link-plus</v-icon>
        <span v-if="!icon" class="ml-2">
          {{ $t("va.actions.associate") }}
        </span>
      </v-btn>
    </template>
    <span>{{ $t("va.actions.associate") }}</span>
  </v-tooltip>
</template>

<script>
export default {
    props: {
    icon: Boolean,
    color: {
      type: String,
      default: "success",
    },
    type: {
      type: String,
      default: "button",
    },
  },
};
</script>
