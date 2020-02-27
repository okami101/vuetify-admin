<template>
  <ul>
    <li v-for="(item, i) in items" :key="i">
      <slot :resource="resource" :item="item"></slot>
    </li>
  </ul>
</template>

<script>
import List from "vuetify-admin/mixins/list";

export default {
  name: "SingleFieldList",
  mixins: [List]
};
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
}

li {
  display: inline-block;
  margin-right: 0.5rem;
}
</style>
