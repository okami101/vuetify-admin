<template>
  <router-link
    :to="{
      name: `${resource}_${link}`,
      params: { id: item.id }
    }"
  >
    <slot :resource="resource" :item="item">
      {{ value }}
    </slot>
  </router-link>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "ResourceLinkField",
  mixins: [Field],
  props: {
    link: {
      type: String,
      default: "edit"
    }
  }
};
</script>
