<template>
  <va-page>
    <template slot="actions">
      <va-list-button :resource="resource" :item="record"></va-list-button>
      <va-edit-button :resource="resource" :item="record"></va-edit-button>
      <slot name="actions"></slot>
      <va-clone-button :resource="resource" :item="record"></va-clone-button>
      <va-delete-button
        :resource="resource"
        :item="record"
        redirect
      ></va-delete-button>
      <va-locale-button :resource="resource"></va-locale-button>
    </template>
    <slot></slot>
  </va-page>
</template>

<script>
import Item from "vuetify-admin/mixins/item";

export default {
  name: "Show",
  mixins: [Item],
};
</script>
