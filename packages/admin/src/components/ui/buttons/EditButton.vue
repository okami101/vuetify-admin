<template>
  <va-action-button
    v-if="item && canShow('edit')"
    :hide-label="icon"
    :label="$t('va.actions.edit')"
    icon="mdi-pencil"
    :color="color || 'blue'"
    text
    exact
    :to="getRoute('edit', { params: { id: item.id } })"
    @click="onClick"
  ></va-action-button>
</template>

<script>
import Item from "../../../mixins/item";
import RedirectButton from "../../../mixins/redirect-button";

/**
 * Button for all edit resource action. Redirect to edit page by default.
 * @displayName VaEditButton
 */
export default {
  mixins: [Item, RedirectButton],
};
</script>
