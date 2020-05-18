<template>
  <v-tooltip bottom :disabled="showLabel">
    <template v-slot:activator="{ on }">
      <!--
        Trigered on click
        @event click
        @property {object} item
      -->
      <v-btn
        :icon="!showLabel"
        :text="text"
        :href="href"
        :target="target"
        :to="to"
        @click="$emit('click', item)"
        :color="color"
        v-on="on"
        exact
        :type="type"
        :loading="loading"
      >
        <v-icon small>{{ icon }}</v-icon>
        <span v-if="showLabel" class="ml-2">
          {{ label }}
        </span>
      </v-btn>
    </template>
    <span>{{ label }}</span>
  </v-tooltip>
</template>

<script>
import Item from "../../../mixins/item";

/**
 * Component tu use for any custom action button. Can be used on datagrid rows or top header of create, show and edit pages.
 * @displayName VaActionButton
 */
export default {
  mixins: [Item],
  props: {
    /**
     * Icon button, must be a valid MDI.
     */
    icon: String,
    /**
     * Label of button, shown as label next icon or as tooltip.
     */
    label: {
      type: String,
      required: true,
    },
    /**
     * Show label next of icon. As tooltip by default.
     */
    showLabel: Boolean,
    /**
     * Color of button.
     */
    color: {
      type: String,
      default: "primary",
    },
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
     * Show as text without background.
     */
    text: Boolean,
    /**
     * Active a spinner if enabled.
     */
    loading: Boolean,
  },
};
</script>
