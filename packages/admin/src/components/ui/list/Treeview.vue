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
      :draggable="editable"
      handle=".handle"
      :load-children="lazy ? fetchNodes : null"
      @change="onChange"
    >
      <template v-slot:prepend="{}" v-if="editable">
        <v-btn icon text class="handle">
          <v-icon small>mdi-cursor-move</v-icon>
        </v-btn>
      </template>
      <template v-slot:label="{ item }">
        <!--
          @slot Use for full node templating.
          @binding {object} item Item linked to the node.
        -->
        <slot name="item" :item="item">
          <template v-if="editable">
            <template v-if="editNodeKey === item[itemKey]">
              <form @submit.prevent="onUpdate(item)" class="edit-form">
                <v-text-field
                  :placeholder="currentResource.singularName"
                  v-model="editNodeText"
                  hide-details
                  class="mr-2"
                  filled
                  dense
                  required
                ></v-text-field>
                <v-btn
                  icon
                  text
                  type="submit"
                  color="success"
                  :loading="updatePending"
                >
                  <v-icon>mdi-floppy</v-icon>
                </v-btn>
                <v-btn
                  icon
                  text
                  color="red"
                  @click="
                    editNodeKey = null;
                    editNodeText = null;
                  "
                >
                  <v-icon>mdi-cancel</v-icon>
                </v-btn>
              </form>
            </template>
            <template v-else>
              <span class="mr-4">{{ item[itemText] }}</span>
              <v-btn
                icon
                text
                color="blue"
                v-if="!disableEdit"
                @click="onEdit(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                icon
                text
                color="red"
                v-if="!disableDelete"
                :loading="deletePending === item[itemKey]"
                @click="onDelete(item)"
              >
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
          </template>
          <span v-else>{{ item[itemText] }}</span>
        </slot>
      </template>
    </v-draggable-treeview>

    <form
      v-if="!disableCreate && editable"
      @submit.prevent="onCreate"
      class="create-form"
    >
      <v-text-field
        :label="currentResource.singularName"
        v-model="newNodeText"
        hide-details
        class="mr-2"
        required
      ></v-text-field>
      <v-btn type="submit" color="success" :loading="createPending">
        <v-icon>mdi-plus</v-icon>
        {{ $t("va.actions.add") }}
      </v-btn>
    </form>
  </div>
</template>

<script>
import Resource from "../../../mixins/resource";

/**
 * Treeview component which support fully editable items with draggable feature and hierarchical data.
 */
export default {
  mixins: [Resource],
  props: {
    /**
     * All selected items via checkbox, can be use via v-model.
     */
    value: {
      type: Array,
      default: () => [],
    },
    /**
     * Unique identifier for each node, `id` by default.
     */
    itemKey: {
      type: String,
      default: "id",
    },
    /**
     * Label text for each node, `name` by default.
     */
    itemText: {
      type: String,
      default: "name",
    },
    /**
     * Enable checkbox selection.
     */
    selectable: Boolean,
    /**
     * Open all nodes by default. Can't be used with `lazy`.
     */
    openAll: Boolean,
    /**
     * Reduce height of each node.
     */
    dense: Boolean,
    /**
     * Enable lazy items loading while node opening.
     * Use `getNodes` data provider method instead of `getTree`.
     */
    lazy: Boolean,
    /**
     * Enable full editable mode with drag & drop.
     */
    editable: Boolean,
    /**
     * Disable new item creation form.
     */
    disableCreate: Boolean,
    /**
     * Disable item edit button.
     */
    disableEdit: Boolean,
    /**
     * Disable item deletion button.
     */
    disableDelete: Boolean,
    /**
     * Disable default inline edit form behavior.
     * You may use `item-edit` event in order to add your custom edit logic.
     */
    disableInlineEdit: Boolean,
    /**
     * Internal active filter.
     * Sent to your data provider inside `filter` params.
     */
    filter: {
      type: Object,
      default: () => {},
    },
    /**
     * Additional form object data to merge when new item created.
     */
    createData: {
      type: Object,
      default: () => {},
    },
    /**
     * Additional form object data to merge when specific item updated.
     */
    updateData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      items: [],
      newNodeText: null,
      editNodeKey: null,
      editNodeText: null,
      createPending: false,
      updatePending: false,
      deletePending: false,
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
        /**
         * Triggered when nodes are selected via checkboxes.
         */
        return this.$emit("input", value);
      },
    },
  },
  methods: {
    async onChange({ newIndex, element, parent }) {
      let { data } = await this.$store.dispatch(`${this.resource}/moveNode`, {
        source: element,
        destination: parent,
        position: newIndex,
      });

      /**
       * Triggered when node moved.
       */
      this.$emit("item-moved", data);
    },
    fetchData() {
      this.lazy ? this.fetchRootNodes() : this.fetchTree();
    },
    async fetchTree() {
      this.loading = true;

      /**
       * Load hierarchical data list
       */
      let { data } = await this.$store.dispatch(`${this.resource}/getTree`, {
        filter: this.filter,
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
      let { data } = await this.$store.dispatch(`${this.resource}/getNodes`, {
        filter: this.filter,
      });

      this.loading = false;

      this.items = [...data.map((i) => ({ ...i, children: [] }))];
    },
    async fetchNodes(item) {
      /**
       * Load child nodes of parent
       */
      let { data } = await this.$store.dispatch(`${this.resource}/getNodes`, {
        filter: this.filter,
        parent: item,
      });

      /**
       * Set children
       */
      item.children.push(...data.map((i) => ({ ...i, children: [] })));
    },
    onEdit(item) {
      /**
       * Triggered when node enter edit mode.
       */
      this.$emit("item-edit", item);

      if (!this.disableInlineEdit) {
        this.editNodeKey = item[this.itemKey];
        this.editNodeText = item[this.itemText];
      }
    },
    async onCreate() {
      this.createPending = true;

      try {
        let { data } = await this.$store.dispatch(`${this.resource}/create`, {
          data: {
            [this.itemText]: this.newNodeText,
            ...this.createData,
          },
        });

        this.fetchData();

        /**
         * Triggered when new node created.
         */
        this.$emit("item-created", data);
      } finally {
        this.newNodeText = null;
        this.createPending = false;
      }
    },
    async onUpdate(item) {
      this.updatePending = true;

      try {
        let { data } = await this.$store.dispatch(`${this.resource}/update`, {
          id: item[this.itemKey],
          data: {
            [this.itemText]: this.editNodeText,
            ...this.updateData,
          },
        });

        this.fetchData();

        /**
         * Triggered when node updated.
         */
        this.$emit("item-updated", data);
      } finally {
        this.editNodeKey = null;
        this.editNodeText = null;
        this.updatePending = false;
      }
    },
    async onDelete(item) {
      this.deletePending = item[this.itemKey];

      try {
        await this.$store.dispatch(`${this.resource}/delete`, {
          id: item[this.itemKey],
        });

        this.fetchData();

        /**
         * Triggered when node deleted.
         */
        this.$emit("item-deleted", item);
      } finally {
        this.deletePending = false;
      }
    },
  },
};
</script>

<style scoped>
.create-form,
.edit-form {
  display: flex;
  align-items: center;
}

.v-input {
  max-width: 200px;
}
</style>
