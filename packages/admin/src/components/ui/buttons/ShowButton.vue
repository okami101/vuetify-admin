<template>
  <va-action-button
    v-if="show || hasAction('show')"
    :show-label="!icon"
    :label="$t('va.actions.show')"
    icon="mdi-eye"
    :color="color || 'info'"
    text
    exact
    :to="route"
    @click="onClick"
  ></va-action-button>
</template>

<script>
import Item from "../../../mixins/item";
import Button from "../../../mixins/button";

/**
 * Button for all show resource action. Redirect to show page by default.
 * Autohide if no show action available unless show prop is active.
 * @displayName VaShowButton
 */
export default {
  mixins: [Item, Button],
  computed: {
    route() {
      if (this.item && this.hasAction("show")) {
        return { name: `${this.resource}_show`, params: { id: this.item.id } };
      }
      return null;
    },
  },
};
</script>
