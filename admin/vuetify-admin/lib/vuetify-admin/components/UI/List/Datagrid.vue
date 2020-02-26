<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :show-select="showSelect"
    :value="value"
    :dense="dense"
    hide-default-footer
    :options="options"
    :loading="loading"
    :items-per-page="itemsPerPage"
    :multi-sort="multiSort"
    :server-items-length="serverItemsLength"
    :single-expand="singleExpand"
    :show-expand="showExpand"
    @click:row="onRowClick"
    @update:options="updateOptions"
    @input="updateSelected"
    :class="{ 'clickable-rows': rowClick }"
  >
    <template
      v-for="field in fields"
      v-slot:[`item.${field.source}`]="{ item, value }"
    >
      <slot :name="field.source" v-bind="{ item, value }">
        <span @click.stop v-if="field.editable" :key="field.source">
          <component
            :is="`va-${field.type}-input`"
            :source="field.source"
            edit
            :item="item"
            :value="value"
            dense
            label=""
            v-bind="field.options"
            @change="val => updateItem({ item, source: field.source, val })"
          ></component>
        </span>
        <component
          v-else
          :is="`va-${field.type}-field`"
          :source="field.source"
          :item="item"
          v-bind="field.options"
          label=""
        ></component>
      </slot>
    </template>
    <template v-slot:item.actions="{ item }">
      <div class="item-actions">
        <slot name="actions-item" v-bind="{ resource, item }">
          <va-show-button
            v-if="rowClick !== 'show'"
            :resource="resource"
            :item="item"
            icon
          ></va-show-button>
          <va-edit-button
            v-if="rowClick !== 'edit'"
            :resource="resource"
            :item="item"
            icon
          ></va-edit-button>
          <va-delete-button
            :resource="resource"
            :item="item"
            icon
          ></va-delete-button>
          <va-clone-button
            :resource="resource"
            :item="item"
            icon
          ></va-clone-button>
        </slot>
      </div>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <slot name="expanded-item" v-bind="{ item }"></slot>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import List from "vuetify-admin/mixins/list";
import { mapState } from "vuex";

export default {
  name: "Datagrid",
  mixins: [List],
  props: {
    rowClick: {
      type: String,
      default: null,
      validator: v => ["show", "edit"].includes(v)
    },
    value: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    },
    showSelect: {
      type: Boolean,
      default: true
    },
    dense: Boolean,
    loading: Boolean,
    itemsPerPage: Number,
    multiSort: {
      type: Boolean,
      default: true
    },
    singleExpand: {
      type: Boolean,
      default: true
    },
    showExpand: Boolean,
    options: {
      type: Object,
      default: () => {}
    },
    rowActions: {
      type: Boolean,
      default: true
    },
    serverItemsLength: Number
  },
  data() {
    return {
      loaded: false
    };
  },
  computed: {
    headers() {
      let fields = this.fields.map(field => {
        return {
          text: field.label,
          value: field.source,
          sortable:
            field.sortable === undefined
              ? this.getDefaultSort(field.type)
              : sortable,
          align: field.align || this.getDefaultAlign(field.type)
        };
      });

      if (this.rowActions) {
        fields.push({
          value: "actions",
          sortable: false
        });
      }
      return fields;
    }
  },
  methods: {
    getDefaultSort(type) {
      if (["boolean"].includes(type)) {
        return false;
      }
      return true;
    },
    getDefaultAlign(type) {
      if (["number"].includes(type)) {
        return "right";
      }
      return "left";
    },
    onRowClick(item) {
      switch (this.rowClick) {
        case "show":
          this.$router.push(`/${this.resource}/${item.id}`);
          break;
        case "edit":
          this.$router.push(`/${this.resource}/${item.id}/edit`);
          break;
      }
    },
    updateOptions(options) {
      if (this.loaded) {
        this.$parent.$parent.$emit("update:options", options);
      }
      this.loaded = true;
    },
    updateSelected(selected) {
      this.$parent.$parent.$emit("input", selected);
    },
    updateItem(payload) {
      this.$parent.$parent.$emit("edit", payload);
    }
  }
};
</script>

<style lang="scss">
.v-data-table tbody tr.v-data-table__expanded__content {
  box-shadow: none;

  td {
    padding: 1.5rem;
  }
}

.v-data-table.clickable-rows tr {
  cursor: pointer;
}

.v-data-table .item-actions {
  white-space: nowrap;
}
</style>
