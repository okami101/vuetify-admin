<template>
  <div>
    <va-aside-content>
      <slot :resource="resource" name="aside"></slot>
    </va-aside-content>
    <div class="d-flex mb-2">
      <v-spacer></v-spacer>
      <slot name="actions">
        <va-list-button :resource="resource"></va-list-button>
      </slot>
    </div>
    <slot :resource="resource"></slot>
  </div>
</template>

<script>
import Page from "vuetify-admin/mixins/page";

export default {
  name: "Create",
  mixins: [Page]
};
</script>
