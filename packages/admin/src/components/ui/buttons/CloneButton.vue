<template>
  <va-action-button
    v-if="show || hasAction('create')"
    :show-label="!icon"
    :label="$t('va.actions.clone')"
    icon="mdi-content-duplicate"
    :color="color || 'success'"
    text
    exact
    :to="route"
    @click="$emit('click', item)"
  ></va-action-button>
</template>

<script>
import Item from "../../../mixins/item";
import Button from "../../../mixins/button";

/**
 * Button for all clone resource action.
 * Redirect to create page by default with target ID of original resource to clone.
 * Autohide if no create action available unless show prop is active.
 * @displayName VaCloneButton
 */
export default {
  mixins: [Item, Button],
  computed: {
    route() {
      if (this.item && this.hasAction("create")) {
        return {
          name: `${this.resource}_create`,
          query: { source: this.item.id },
        };
      }

      return null;
    },
  },
};
</script>
