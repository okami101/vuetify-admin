<template>
  <va-action-page :title="title">
    <template slot="actions">
      <va-list-button :resource="resource"></va-list-button>
      <!-- @slot Additional custom action buttons placeholder. -->
      <slot name="actions"></slot>
      <va-locale-button :resource="resource"></va-locale-button>
    </template>
    <!-- @slot Page content placeholder. -->
    <slot></slot>
  </va-action-page>
</template>

<script>
import Page from "../../../mixins/page";

/**
 * Page layout for resource creation.
 */
export default {
  mixins: [Page],
};
</script>
