<template>
  <va-action-button
    :hide-label="icon"
    :label="$t('va.actions.save')"
    icon="mdi-floppy"
    :color="color || 'primary'"
    type="submit"
    :loading="saving"
  ></va-action-button>
</template>

<script>
import Button from "../../../mixins/button";

/**
 * Default saving button that can be used for VaForm component.
 * Dumb component, just a submit button, VaForm do the real work.
 * @displayName VaSaveButton
 */
export default {
  mixins: [Button],
  props: {
    /**
     * Will provoke a spinner if active.
     * Should be synced with `saving` VaForm prop.
     */
    saving: Boolean,
  },
};
</script>
