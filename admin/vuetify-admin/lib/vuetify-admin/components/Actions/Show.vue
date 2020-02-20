<template>
  <div>
    <va-aside-content>
      <slot name="aside" v-bind="{ item }"></slot>
    </va-aside-content>
    <div class="d-flex mb-2">
      <v-spacer></v-spacer>
      <va-edit-button v-if="can('edit')"></va-edit-button>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Page from "../../mixins/page";
import { mapGetters } from "vuex";

export default {
  name: "Show",
  mixins: [Page],
  computed: {
    ...mapGetters({
      can: "api/can"
    }),
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
