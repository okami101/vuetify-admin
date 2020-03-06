<template>
  <ul>
    <li v-for="(item, i) in getItems" :key="i">
      <slot :resource="resource" :item="item"></slot>
    </li>
  </ul>
</template>

<script>
import List from "vuetify-admin/mixins/list";

export default {
  name: "SingleFieldList",
  mixins: [List],
  props: {
    limit: Number
  },
  computed: {
    getItems() {
      return this.limit ? this.items.slice(0, this.limit) : this.items;
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  margin-top: 0.25rem;
}

li {
  display: inline-block;
  margin: 0rem 0.25rem 0.25rem 0;
}
</style>
