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
      handle=".handle"
      :load-children="async ? fetchNodes : null"
      @change="onChange"
    >
      <template v-slot:prepend="{}">
        <v-btn icon text class="handle" v-if="draggable">
          <v-icon small>mdi-cursor-move</v-icon>
        </v-btn>
      </template>
    </v-draggable-treeview>
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
    async: Boolean,
  },
  data() {
    return {
      loading: false,
      items: [],
    };
  },
  mounted() {
    this.async ? this.fetchRootNodes() : this.fetchTree();
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
      getRootNodes: "api/getRootNodes",
      getChildNodes: "api/getChildNodes",
    }),
    onChange({ newIndex, element, parent }) {
      console.log(newIndex);
      console.log(element);
      console.log(parent);
    },
    async fetchTree() {
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
    async fetchRootNodes() {
      this.loading = true;

      /**
       * Load hierarchical data list
       */
      let { data } = await this.getRootNodes({
        resource: this.resource,
      });

      this.loading = false;

      this.items = [...data.map((i) => ({ ...i, children: [] }))];
    },
    async fetchNodes(item) {
      /**
       * Load child nodes of parent
       */
      let { data } = await this.getChildNodes({
        resource: this.resource,
        params: {
          parentId: item.id,
        },
      });

      /**
       * Set children
       */
      item.children.push(...data.map((i) => ({ ...i, children: [] })));
    },
  },
};
</script>
