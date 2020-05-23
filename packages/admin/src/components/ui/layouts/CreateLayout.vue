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
import Resource from "../../../mixins/resource";

/**
 * Page layout for resource creation.
 * @displayName VaCreateLayout
 */
export default {
  mixins: [Resource],
  props: {
    /**
     * Optional H1 title of the page shown on the left of top header
     */
    title: String,
  },
};
</script>
