<template>
  <v-list>
    <v-list-item v-for="(item, i) in items" :key="i">
      <v-list-item-content>
        <slot :resource="resource" :item="item"></slot>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import List from "vuetify-admin/mixins/list";

export default {
  name: "SimpleList",
  mixins: [List]
};
</script>
