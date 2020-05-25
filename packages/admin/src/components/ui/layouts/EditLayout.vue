<template>
  <va-action-page :title="title">
    <template slot="actions">
      <va-list-button :resource="resource" :item="record"></va-list-button>
      <va-show-button :resource="resource" :item="record"></va-show-button>
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
import Page from "../../../mixins/page";

/**
 * Page layout for resource edition.
 * Contain specific related action as deleting, cloning, showing as well as translation action.
 * @displayName VaEditLayout
 */
export default {
  mixins: [Page],
};
</script>
