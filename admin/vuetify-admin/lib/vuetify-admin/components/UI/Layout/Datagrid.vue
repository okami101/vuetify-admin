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
      v-slot:[`item.${field.source}`]="{ item }"
    >
      <slot :name="field.source" v-bind="{ item }">
        <component
          :is="`va-${field.type || 'text'}-field`"
          :source="field.source"
          :item="item"
          v-bind="field.options"
        ></component>
      </slot>
    </template>
    <template v-slot:item.actions="{ item }">
      <slot name="actions-item" v-bind="{ item }"></slot>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <slot name="expanded-item" v-bind="{ item }"></slot>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Datagrid",
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
    items: {
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
    serverItemsLength: Number
  },
  data() {
    return {
      loaded: false
    };
  },
  computed: {
    ...mapState({
      resourceName: state => state.api.resourceName
    }),
    headers() {
      let fields = this.fields.map(field => {
        return {
          ...field,
          text: field.label || this.$t(`attributes.${field.source}`),
          value: field.source
        };
      });

      if (this.$scopedSlots["actions-item"]) {
        fields.push({
          value: "actions",
          sortable: false
        });
      }
      return fields;
    }
  },
  methods: {
    onRowClick(item) {
      switch (this.rowClick) {
        case "show":
          this.$router.push(`/${this.resourceName}/${item.id}`);
          break;
        case "edit":
          this.$router.push(`/${this.resourceName}/${item.id}/edit`);
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
</style>
