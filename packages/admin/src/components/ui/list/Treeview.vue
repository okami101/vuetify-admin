<template>
  <div>
    <v-draggable-treeview
      ref="treeview"
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
import { mapActions } from "vuex";

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
  mounted() {
    this.fetchData();
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
    ...mapActions({
      getTree: "api/getTree",
    }),
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
      let { data } = await this.getTree({
        resource: this.resource,
      });

      this.loading = false;

      this.items = data;

      if (this.openAll) {
        this.$nextTick(() => {
          this.$refs.treeview.updateAll(true);
        });
      }
    },
  },
};
</script>
