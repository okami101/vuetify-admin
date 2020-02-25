<template>
  <div>
    <va-aside-content>
      <slot name="aside" :resource="getResource" :item="record"></slot>
    </va-aside-content>
    <div class="d-flex mb-2">
      <v-spacer></v-spacer>
      <slot name="actions">
        <va-show-button :resource="getResource" :item="record"></va-show-button>
      </slot>
    </div>
    <slot :resource="getResource" :item="record"></slot>
  </div>
</template>

<script>
import Page from "vuetify-admin/mixins/page";

export default {
  name: "Edit",
  mixins: [Page],
  methods: {
    onDeleted() {
      this.$router.push(`/${this.getResource}`);
    }
  }
};
</script>
