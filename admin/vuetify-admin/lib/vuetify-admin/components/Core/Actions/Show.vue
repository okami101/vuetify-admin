<template>
  <div>
    <va-aside-content>
      <slot name="aside" :resource="getResource" :item="record"></slot>
    </va-aside-content>
    <div class="d-flex mb-2">
      <v-spacer></v-spacer>
      <slot name="actions">
        <va-list-button :resource="getResource" :item="record"></va-list-button>
        <va-edit-button :resource="getResource" :item="record"></va-edit-button>
        <va-clone-button
          :resource="getResource"
          :item="record"
        ></va-clone-button>
        <va-delete-button
          :resource="getResource"
          :item="record"
        ></va-delete-button>
      </slot>
    </div>
    <slot :resource="getResource" :item="record"></slot>
  </div>
</template>

<script>
import Page from "vuetify-admin/mixins/page";

export default {
  name: "Show",
  mixins: [Page],
  methods: {
    onDeleted() {
      this.$router.push(`/${this.getResource}`);
    }
  }
};
</script>
