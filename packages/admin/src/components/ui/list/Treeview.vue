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
      <template v-slot:label="{ item }">
        <slot name="item" :item="item">
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
        </slot>
      </template>
    </v-draggable-treeview>

    <form v-if="!disableCreate" @submit.prevent="onCreate" class="create-form">
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
    disableCreate: Boolean,
    disableEdit: Boolean,
    disableDelete: Boolean,
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
     * Additional form object data to merge with row-create form.
     */
    createData: {
      type: Object,
      default: () => {},
    },
    /**
     * Additional form object data to merge with row-edit form.
     */
    editData: {
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
        return this.$emit("input", value);
      },
    },
  },
  methods: {
    ...mapActions({
      getTree: "api/getTree",
      getRootNodes: "api/getRootNodes",
      getChildNodes: "api/getChildNodes",
      moveNode: "api/moveNode",
    }),
    onChange({ newIndex, element, parent }) {
      this.moveNode({
        resource: this.resource,
        params: {
          id: element[this.itemKey],
          source: element,
          destination: parent,
          position: newIndex,
        },
      });
    },
    fetchData() {
      this.async ? this.fetchRootNodes() : this.fetchTree();
    },
    async fetchTree() {
      this.loading = true;

      /**
       * Load hierarchical data list
       */
      let { data } = await this.getTree({
        resource: this.resource,
        params: {
          filter: this.filter,
        },
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
        params: {
          filter: this.filter,
        },
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
          filter: this.filter,
          parentId: item[this.itemKey],
        },
      });

      /**
       * Set children
       */
      item.children.push(...data.map((i) => ({ ...i, children: [] })));
    },
    onEdit(item) {
      this.$emit("item-edit", item);

      if (!this.disableInlineEdit) {
        this.editNodeKey = item[this.itemKey];
        this.editNodeText = item[this.itemText];
      }
    },
    async onCreate() {
      this.createPending = true;

      try {
        await this.$store.dispatch(`${this.resource}/create`, {
          data: {
            [this.itemText]: this.newNodeText,
            ...this.createData,
          },
        });

        this.fetchData();
      } finally {
        this.newNodeText = null;
        this.createPending = false;
      }
    },
    async onUpdate(item) {
      this.updatePending = true;

      try {
        await this.$store.dispatch(`${this.resource}/update`, {
          id: item[this.itemKey],
          data: {
            [this.itemText]: this.editNodeText,
            ...this.editData,
          },
        });

        this.fetchData();
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
