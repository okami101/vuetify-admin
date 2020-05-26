<template>
  <va-action-button
    v-if="canShow('create')"
    :hide-label="icon"
    :label="$t('va.actions.create')"
    icon="mdi-plus"
    :color="color || 'success'"
    text
    :to="getRoute('create')"
    @click="onClick"
  ></va-action-button>
</template>

<script>
import Resource from "../../../mixins/resource";
import RedirectButton from "../../../mixins/redirect-button";

/**
 * Button for all create resource action. Redirect to create page by default.
 */
export default {
  mixins: [Resource, RedirectButton],
};
</script>
