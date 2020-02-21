<template>
  <div>
    <va-aside-content>
      <slot name="aside" v-bind="{ item }"></slot>
    </va-aside-content>
    <div class="d-flex mb-2">
      <v-spacer></v-spacer>
      <slot name="actions">
        <va-list-button></va-list-button>
        <va-edit-button></va-edit-button>
        <va-clone-button></va-clone-button>
        <va-delete-button></va-delete-button>
      </slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Page from "vuetify-admin/mixins/page";

export default {
  name: "Show",
  mixins: [Page],
  computed: {
    defaultTitle() {
      if (!this.resource) {
        return;
      }
      return `${this.$tc(`resources.${this.resourceName}`, 1)} #${
        this.resource.id
      }`;
    }
  }
};
</script>
