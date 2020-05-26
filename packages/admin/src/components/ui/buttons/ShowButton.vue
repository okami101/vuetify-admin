<template>
  <va-action-button
    v-if="item && canShow('show')"
    :hide-label="icon"
    :label="$t('va.actions.show')"
    icon="mdi-eye"
    :color="color || 'info'"
    text
    exact
    :to="getRoute('show', { params: { id: item.id } })"
    @click="onClick"
  ></va-action-button>
</template>

<script>
import RedirectButton from "../../../mixins/redirect-button";

/**
 * Button for all show resource action. Redirect to show page by default.
 */
export default {
  mixins: [RedirectButton],
};
</script>
