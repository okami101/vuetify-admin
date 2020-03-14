<template>
  <div v-if="record">
    <va-aside-content>
      <slot name="aside" :resource="resource" :item="record"></slot>
    </va-aside-content>
    <div class="d-flex mb-2">
      <v-spacer></v-spacer>
      <slot name="actions">
        <va-show-button :resource="resource" :item="record"></va-show-button>
        <va-locale-button :resource="resource"></va-locale-button>
      </slot>
    </div>
    <slot :resource="resource" :item="record"></slot>
  </div>
</template>

<script>
import Item from "vuetify-admin/mixins/item";

export default {
  name: "Edit",
  mixins: [Item],
  methods: {
    onDeleted() {
      this.$router.push(`/${this.resource}`);
    }
  }
};
</script>
