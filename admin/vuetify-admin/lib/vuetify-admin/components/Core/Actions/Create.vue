<template>
  <div>
    <va-aside-content>
      <slot :resource="getResource" name="aside"></slot>
    </va-aside-content>
    <div class="d-flex mb-2">
      <v-spacer></v-spacer>
      <slot name="actions">
        <va-list-button :resource="getResource"></va-list-button>
      </slot>
    </div>
    <slot :resource="getResource"></slot>
  </div>
</template>

<script>
import Page from "vuetify-admin/mixins/page";

export default {
  name: "Create",
  mixins: [Page]
};
</script>
