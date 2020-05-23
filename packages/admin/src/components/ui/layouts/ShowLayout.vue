<template>
  <va-action-page :title="title">
    <template slot="actions">
      <va-list-button :resource="resource" :item="record"></va-list-button>
      <va-edit-button :resource="resource" :item="record"></va-edit-button>
      <!-- @slot Additional custom action buttons placeholder. -->
      <slot name="actions"></slot>
      <va-clone-button :resource="resource" :item="record"></va-clone-button>
      <va-delete-button
        :resource="resource"
        :item="record"
        redirect
      ></va-delete-button>
      <va-locale-button :resource="resource"></va-locale-button>
    </template>
    <!-- @slot Page content placeholder. -->
    <slot v-if="record"></slot>
  </va-action-page>
</template>

<script>
import Item from "../../../mixins/item";

/**
 * Page layout for resource detail showing.
 * Contain specific related action as deleting, cloning, editing as well as translation action.
 * @displayName VaShowLayout
 */
export default {
  mixins: [Item],
  props: {
    /**
     * Optional H1 title of the page shown on the left of top header
     */
    title: String,
  },
};
</script>
