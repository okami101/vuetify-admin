<template>
  <va-action-button
    :hide-label="icon"
    :label="$t('va.actions.associate')"
    icon="mdi-link-plus"
    :color="color || 'success'"
    text
    type="submit"
    @click="onClick"
  ></va-action-button>
</template>

<script>
import Button from "../../../mixins/button";

/**
 * Action button for resource association. Used on lists with association enabled.
 * Dumb component, just a submit button.
 */
export default {
  mixins: [Button],
};
</script>
