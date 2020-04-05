<template>
  <va-page :title="title">
    <template slot="actions">
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
    </template>
    <slot v-if="record"></slot>
  </va-page>
</template>

<script>
import Item from "../../../mixins/item";

export default {
  name: "Edit",
  mixins: [Item],
  props: {
    title: String,
  },
};
</script>
