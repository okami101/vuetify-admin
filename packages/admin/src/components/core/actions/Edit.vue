<template>
  <va-action-page :title="title">
    <template slot="actions">
      <va-list-button :resource="resource" :item="record"></va-list-button>
      <va-show-button :resource="resource" :item="record"></va-show-button>
      <!-- @slot Slot for additional custom action buttons. -->
      <slot name="actions"></slot>
      <va-clone-button :resource="resource" :item="record"></va-clone-button>
      <va-delete-button
        :resource="resource"
        :item="record"
        redirect
      ></va-delete-button>
      <va-locale-button :resource="resource"></va-locale-button>
    </template>
    <!-- @slot Default slot for page content. -->
    <slot v-if="record"></slot>
  </va-action-page>
</template>

<script>
import Item from "../../../mixins/item";

/**
 * Page layout for resource edition.
 * Contain specific related action as deleting, cloning, showing as well as translation action.
 * @displayName VaEdit
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
