<template>
  <div>
    <va-aside-content>
      <slot name="aside" :resource="resource" :item="item"></slot>
    </va-aside-content>
    <div class="d-flex mb-2">
      <v-spacer></v-spacer>
      <slot name="actions">
        <va-list-button :resource="resource" :item="item"></va-list-button>
        <va-edit-button :resource="resource" :item="item"></va-edit-button>
        <va-clone-button :resource="resource" :item="item"></va-clone-button>
        <va-delete-button :resource="resource" :item="item"></va-delete-button>
      </slot>
    </div>
    <slot :resource="resource" :item="item"></slot>
  </div>
</template>

<script>
import Page from "vuetify-admin/mixins/page";

export default {
  name: "Show",
  mixins: [Page],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    onDeleted() {
      this.$router.push(`/${this.resource}`);
    }
  }
};
</script>
