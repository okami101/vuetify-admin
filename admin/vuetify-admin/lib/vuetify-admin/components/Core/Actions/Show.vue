<template>
  <div>
    <va-aside-content>
      <slot name="aside" :item="item"></slot>
    </va-aside-content>
    <div class="d-flex mb-2">
      <v-spacer></v-spacer>
      <slot name="actions">
        <va-list-button :item="item"></va-list-button>
        <va-edit-button :item="item"></va-edit-button>
        <va-clone-button :item="item"></va-clone-button>
        <va-delete-button :item="item"></va-delete-button>
      </slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Page from "vuetify-admin/mixins/page";

export default {
  name: "Show",
  mixins: [Page]
};
</script>
