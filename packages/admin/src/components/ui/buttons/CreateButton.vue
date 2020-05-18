<template>
  <va-action-button
    v-if="show || hasAction('create')"
    :show-label="!icon"
    :label="$t('va.actions.create')"
    icon="mdi-plus"
    :color="color || 'success'"
    text
    :to="route"
    @click="$emit('click')"
  ></va-action-button>
</template>

<script>
import Resource from "../../../mixins/resource";
import Button from "../../../mixins/button";

/**
 * Button for all create resource action. Redirect to create page by default.
 * Autohide if no create action available unless show prop is active.
 * @displayName VaCreateButton
 */
export default {
  mixins: [Resource, Button],
  computed: {
    route() {
      if (this.hasAction("create")) {
        return { name: `${this.resource}_create` };
      }
      return null;
    },
  },
};
</script>
