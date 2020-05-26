<template>
  <va-action-button
    v-if="item && canShow('create')"
    :hide-label="icon"
    :label="$t('va.actions.clone')"
    icon="mdi-content-duplicate"
    :color="color || 'success'"
    text
    exact
    :to="getRoute('create', { query: { source: item.id } })"
    @click="onClick"
  ></va-action-button>
</template>

<script>
import RedirectButton from "../../../mixins/redirect-button";

/**
 * Button for all clone resource action.
 * Redirect to create page by default with target ID of original resource to clone.
 */
export default {
  mixins: [RedirectButton],
};
</script>
