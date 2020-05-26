<template>
  <va-action-page :title="title">
    <template slot="actions">
      <va-list-button :resource="resource" :item="item"></va-list-button>
      <va-show-button :resource="resource" :item="item"></va-show-button>
      <!-- @slot Additional custom action buttons placeholder. -->
      <slot name="actions"></slot>
      <va-clone-button :resource="resource" :item="item"></va-clone-button>
      <va-delete-button
        :resource="resource"
        :item="item"
        redirect
      ></va-delete-button>
      <va-locale-button :resource="resource"></va-locale-button>
    </template>
    <!-- @slot Page content placeholder. -->
    <slot v-if="item"></slot>
  </va-action-page>
</template>

<script>
import Page from "../../../mixins/page";

/**
 * Page layout for resource edition.
 * Contain specific related action as deleting, cloning, showing as well as translation action.
 */
export default {
  mixins: [Page],
};
</script>
