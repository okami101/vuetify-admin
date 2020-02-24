<template>
  <div>
    <va-aside-content>
      <slot name="aside" :item="item"></slot>
    </va-aside-content>
    <div class="d-flex mb-2">
      <v-spacer></v-spacer>
      <slot name="actions">
        <va-show-button :item="item"></va-show-button>
      </slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Page from "vuetify-admin/mixins/page";

export default {
  name: "Edit",
  mixins: [Page]
};
</script>
