<template>
  <div class="va-simple-form-list">
    <ol v-if="items.length">
      <li v-for="(item, i) in items" :key="i">
        <slot></slot>
        <v-btn outlined color="red" @click.stop="remove">
          <v-icon small>mdi-minus-circle-outline</v-icon>
          <span class="ml-2">{{ $t("va.actions.remove") }}</span>
        </v-btn>
      </li>
    </ol>
    <v-btn outlined color="green" @click.stop="add">
      <v-icon small>mdi-plus-circle-outline</v-icon>
      <span class="ml-2">{{ $t("va.actions.add") }}</span>
    </v-btn>
  </div>
</template>

<script>
import List from "vuetify-admin/mixins/list";

export default {
  name: "SimpleFormList",
  mixins: [List],
  methods: {
    add() {},
    remove() {}
  }
};
</script>

<style lang="scss" scoped>
.va-simple-form-list {
}
</style>
