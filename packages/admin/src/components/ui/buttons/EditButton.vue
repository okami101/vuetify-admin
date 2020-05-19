<template>
  <va-action-button
    v-if="show || hasAction('edit')"
    :show-label="!icon"
    :label="$t('va.actions.edit')"
    icon="mdi-pencil"
    :color="color || 'blue'"
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
 * Button for all edit resource action. Redirect to edit page by default.
 * Autohide if no edit action available unless show prop is active.
 * @displayName VaEditButton
 */
export default {
  mixins: [Item, Button],
  computed: {
    route() {
      if (this.item && this.hasAction("edit")) {
        return { name: `${this.resource}_edit`, params: { id: this.item.id } };
      }
      return null;
    },
  },
};
</script>
