<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :show-select="showSelect"
    :value="value"
    hide-default-footer
    :options="options"
    :loading="loading"
    :items-per-page="itemsPerPage"
    :multi-sort="multiSort"
    :server-items-length="serverItemsLength"
    @update:options="updateOptions"
    @input="updateSelected"
  >
    <template
      v-for="slot in Object.keys($scopedSlots)"
      v-slot:[`item.${slot}`]="scope"
    >
      <slot :name="slot" v-bind="scope"></slot>
    </template>
    <template v-slot:item.actions="scope">
      <slot name="row-actions" v-bind="scope"></slot>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "Datagrid",
  props: {
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
    loading: Boolean,
    itemsPerPage: Number,
    multiSort: {
      type: Boolean,
      default: true
    },
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
    getFields() {
      return this.getFormattedFields(this.fields);
    },
    headers() {
      let fields = this.getFields.map(field => {
        return {
          ...field,
          text: field.label || this.$t(`attributes.${field.source}`),
          value: field.source
        };
      });

      if (this.$scopedSlots["row-actions"]) {
        fields.push({
          value: "actions",
          sortable: false
        });
      }
      return fields;
    }
  },
  methods: {
    updateOptions(options) {
      if (this.loaded) {
        this.$parent.$parent.$emit("update:options", options);
      }
      this.loaded = true;
    },
    updateSelected(selected) {
      this.$parent.$parent.$emit("input", selected);
    },
    getFormattedFields(fields) {
      return fields
        .map(f => {
          return typeof f === "string"
            ? {
                source: f
              }
            : f;
        })
        .map(f => {
          return {
            ...f,
            label: f.label || this.$t(`attributes.${f.source}`)
          };
        });
    }
  }
};
</script>
