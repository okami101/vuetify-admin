<template>
  <div v-if="record">
    <va-aside-content>
      <slot name="aside" :resource="resource" :item="record"></slot>
    </va-aside-content>
    <div class="d-flex mb-2">
      <v-spacer></v-spacer>
      <slot name="actions">
        <va-list-button :resource="resource" :item="record"></va-list-button>
        <va-edit-button :resource="resource" :item="record"></va-edit-button>
        <va-clone-button :resource="resource" :item="record"></va-clone-button>
        <va-delete-button
          :resource="resource"
          :item="record"
        ></va-delete-button>
        <va-locale-button :resource="resource"></va-locale-button>
      </slot>
    </div>
    <slot :resource="resource" :item="record"></slot>
  </div>
</template>

<script>
import Page from "vuetify-admin/mixins/page";
import Item from "vuetify-admin/mixins/item";

export default {
  name: "Show",
  mixins: [Page, Item],
  methods: {
    onDeleted() {
      this.$router.push(`/${this.resource}`);
    }
  }
};
</script>
