<template>
  <va-action-page :title="title">
    <template slot="actions">
      <va-list-button :resource="resource"></va-list-button>
      <!-- @slot Slot for additional custom action buttons. -->
      <slot name="actions"></slot>
      <va-locale-button :resource="resource"></va-locale-button>
    </template>
    <!-- @slot Default slot for page content. -->
    <slot></slot>
  </va-action-page>
</template>

<script>
import Resource from "../../../mixins/resource";

/**
 * Page layout for resource creation.
 * @displayName VaCreate
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
