<template>
  <div v-if="record">
    <va-aside-content>
      <slot name="aside"></slot>
    </va-aside-content>
    <slot name="header">
      <div class="d-flex mb-2">
        <v-spacer></v-spacer>
        <va-list-button :resource="resource" :item="record"></va-list-button>
        <va-show-button :resource="resource" :item="record"></va-show-button>
        <slot name="actions"></slot>
        <va-clone-button :resource="resource" :item="record"></va-clone-button>
        <va-delete-button
          :resource="resource"
          :item="record"
          redirect
        ></va-delete-button>
        <va-locale-button :resource="resource"></va-locale-button>
      </div>
    </slot>
    <slot></slot>
  </div>
</template>

<script>
import Item from "vuetify-admin/mixins/item";

export default {
  name: "Edit",
  mixins: [Item],
};
</script>
