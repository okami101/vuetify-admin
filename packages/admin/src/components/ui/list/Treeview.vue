<template>
  <div>
    <v-draggable-treeview
      :items="items"
      :item-key="itemKey"
      :item-text="itemText"
      v-model="getValue"
      :selectable="selectable"
      :open-all="openAll"
      :dense="dense"
      :draggable="draggable"
      @change="onChange"
    ></v-draggable-treeview>
  </div>
</template>

<script>
import Resource from "../../../mixins/resource";

/**
 * Treeview component with draggable feature
 */
export default {
  mixins: [Resource],
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    itemKey: {
      type: String,
      default: "id",
    },
    itemText: {
      type: String,
      default: "name",
    },
    selectable: Boolean,
    openAll: Boolean,
    dense: Boolean,
    draggable: Boolean,
  },
  data() {
    return {
      loading: false,
      items: [],
    };
  },
  computed: {
    getValue: {
      get() {
        return this.value;
      },
      set(value) {
        return this.$emit("input", value);
      },
    },
  },
  methods: {
    onChange({ newIndex, element, parent }) {
      console.log(newIndex);
      console.log(element);
      console.log(parent);
    },
    async fetchData() {
      this.loading = true;

      /**
       * Load hierarchical data list
       */
      let { data } = await this.getList({
        resource: this.resource,
      });

      this.loading = false;

      this.items = data;
    },
  },
};
</script>
