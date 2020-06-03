<template>
  <v-tooltip bottom :disabled="!hideLabel">
    <template v-slot:activator="{ on }">
      <v-btn
        :icon="hideLabel || !$vuetify.breakpoint.lgAndUp"
        :text="text"
        :href="href"
        :target="target"
        :to="to"
        @click="onClick"
        :color="color"
        v-on="on"
        exact
        :type="type"
        :loading="loading"
      >
        <v-icon small>{{ icon }}</v-icon>
        <span v-if="!hideLabel && $vuetify.breakpoint.lgAndUp" class="ml-2">
          {{ label }}
        </span>
      </v-btn>
    </template>
    <span>{{ label }}</span>
  </v-tooltip>
</template>

<script>
import ActionButton from "../../../mixins/action-button";

/**
 * Component tu use for any custom action button. Can be used on data table rows or top header of create, show and edit pages.
 */
export default {
  mixins: [ActionButton],
  props: {
    /**
     * Set the button's type attribute.
     */
    type: {
      type: String,
      default: "button",
    },
    /**
     * Vue route to redirect on click.
     */
    to: [String, Object],
    /**
     * Turn button to anchor and use href.
     */
    href: [String, Object],
    /**
     * Anchor target if href used.
     */
    target: String,
    /**
     * Active a spinner if enabled.
     */
    loading: Boolean,
  },
};
</script>
