<template>
  <div>
    <div v-for="(item, i) in items" :key="i">
      <slot :resource="resource" :item="item"></slot>
    </div>
  </div>
</template>

<script>
import List from "vuetify-admin/mixins/list";

export default {
  name: "SingleFieldList",
  mixins: [List]
};
</script>
