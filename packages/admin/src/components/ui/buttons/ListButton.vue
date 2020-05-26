<template>
  <va-action-button
    v-if="hasAction('list')"
    :hide-label="icon"
    :label="$t('va.actions.list')"
    icon="mdi-view-list"
    :color="color || 'success'"
    text
    exact
    :to="{ name: `${resource}_list` }"
  ></va-action-button>
</template>

<script>
import Resource from "../../../mixins/resource";
import Button from "../../../mixins/button";

/**
 * Button for all list resource action. Redirect to list page by default.
 * Shown on internal CRUD page at top header.
 */
export default {
  mixins: [Resource, Button],
};
</script>
