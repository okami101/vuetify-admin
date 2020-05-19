<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :show-select="!disableSelect"
    :disable-sort="disableSort"
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
    @update:options="(options) => $emit('update:options', options)"
    @input="(selected) => $emit('input', selected)"
    :class="{ 'clickable-rows': rowClick || !!$listeners['row-click'] }"
  >
    <template
      v-for="field in getFields"
      v-slot:[`item.${field.source}`]="{ item, value }"
    >
      <component
        v-if="field.editable"
        :key="field.source"
        :is="`va-${field.type || 'text'}-input`"
        :resource="resource"
        editable
        :item="item"
        :value="value"
        dense
        label=""
        v-bind="getAttributes(field)"
      ></component>
      <router-link
        v-else-if="field.link"
        :key="field.source"
        :to="{
          name: `${resource}_${field.link}`,
          params: { id: item.id },
        }"
      >
        <component
          v-if="field.type"
          :key="field.source"
          :is="`va-${field.type}-field`"
          :resource="resource"
          :item="item"
          v-bind="getAttributes(field)"
          v-slot="props"
        >
          <slot
            :name="field.source"
            :item="props.item || item"
            v-bind="props"
          ></slot>
        </component>
        <slot v-else :name="field.source" v-bind="{ item, value }">
          {{ value }}
        </slot>
      </router-link>
      <component
        v-else-if="field.type"
        :key="field.source"
        :is="`va-${field.type}-field`"
        :resource="resource"
        :item="item"
        v-bind="getAttributes(field)"
        v-slot="props"
      >
        <slot
          :name="field.source"
          :item="props.item || item"
          v-bind="props"
        ></slot>
      </component>
      <slot v-else :name="field.source" v-bind="{ item, value }">
        {{ value }}
      </slot>
    </template>
    <template v-if="!disableRowActions" v-slot:item.actions="{ item }">
      <div class="item-actions">
        <slot name="cell.actions" v-bind="{ resource, item }">
          <va-show-button
            v-if="!disableShow"
            :show="!!$listeners.show"
            :resource="resource"
            :item="item"
            icon
            @click="(item) => onAction('show', item)"
          ></va-show-button>
          <va-edit-button
            v-if="!disableEdit"
            :show="!!$listeners.edit"
            :resource="resource"
            :item="item"
            icon
            @click="(item) => onAction('edit', item)"
          ></va-edit-button>
          <slot name="item.actions" v-bind="{ resource, item }"></slot>
          <va-clone-button
            v-if="!disableClone"
            :show="!!$listeners.create"
            :resource="resource"
            :item="item"
            icon
            @click="(item) => onAction('create', item)"
          ></va-clone-button>
          <!--
            Trigered on successful dissociation of resource item.
            @event dissociated
          -->
          <va-dissociate-button
            v-if="association"
            :resource="resource"
            :item="item"
            :source-resource="association.resource"
            :source="association.source"
            :source-id="association.id"
            icon
            @dissociated="$emit('dissociated', item)"
          ></va-dissociate-button>
          <!--
            Trigered on successful deletetion of ressource item.
            @event deleted
          -->
          <va-delete-button
            v-if="!disableDelete"
            :resource="resource"
            :item="item"
            icon
            @deleted="$emit('deleted', item)"
          ></va-delete-button>
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
import List from "../../../mixins/list";
import { mapState, mapActions, mapMutations } from "vuex";
import upperFirst from "lodash/upperFirst";

/**
 * Dumb datagrid component, you will need data iterator as VaList in order to make it usable.
 * This component allows you to template all fields columns.
 * @displayName VaDatagrid
 */
export default {
  mixins: [List],
  props: {
    /**
     * Make each row clickable. Use predefined function as edit or show.
     * @values show, edit
     */
    rowClick: {
      type: [String, Boolean],
      default: null,
      validator: (v) => ["show", "edit"].includes(v),
    },
    value: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Array,
      default: () => [],
    },
    sortable: {
      type: Array,
      default: () => [],
    },
    dense: Boolean,
    loading: Boolean,
    itemsPerPage: Number,
    multiSort: {
      type: Boolean,
      default: true,
    },
    singleExpand: {
      type: Boolean,
      default: true,
    },
    showExpand: Boolean,
    options: {
      type: Object,
      default: () => {},
    },
    rowActions: {
      type: Boolean,
      default: true,
    },
    serverItemsLength: Number,
    disableSelect: Boolean,
    disableSort: Boolean,
    disableShow: Boolean,
    disableEdit: Boolean,
    disableClone: Boolean,
    disableDelete: Boolean,
    disableRowActions: Boolean,
    association: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    headers() {
      let fields = this.getFields.map((field) => {
        return {
          text: field.label,
          value: field.source,
          sortable: this.getDefaultSort(field),
          align: field.align || this.getDefaultAlign(field),
        };
      });

      if (this.rowActions) {
        fields.push({
          value: "actions",
          sortable: false,
        });
      }
      return fields;
    },
    getFields() {
      return this.fields
        .map((f) => {
          return typeof f === "string"
            ? {
                source: f,
              }
            : f;
        })
        .map((f) => {
          return {
            ...f,
            type: f.type,
            label:
              f.label ||
              this.$t(`resources.${this.resource}.fields.${f.source}`),
          };
        });
    },
  },
  methods: {
    ...mapActions({
      getOne: "api/getOne",
    }),
    getAttributes(field) {
      let { type, link, ...attributes } = field;
      return attributes;
    },
    getDefaultSort(field) {
      if (this.sortable.length) {
        return this.sortable.includes(field.source);
      }
      return !field.type || ["text", "date", "number"].includes(field.type);
    },
    getDefaultAlign(field) {
      if (["number"].includes(field.type)) {
        return "right";
      }
      return "left";
    },
    onRowClick(item) {
      switch (this.rowClick) {
        case "show":
          this.$router.push({
            name: `${this.resource}_show`,
            params: { id: item.id },
          });
          break;
        case "edit":
          this.$router.push({
            name: `${this.resource}_edit`,
            params: { id: item.id },
          });
          break;
        default:
          /**
           * Generic `row-click` event if you set rowClick on `true` with selected item.
           */
          this.$emit("row-click", item);
          break;
      }
    },
    async onAction(action, item) {
      if (!this.$listeners[action]) {
        return;
      }

      let titleKey = `resources.${this.resource}.titles.${action}`;
      let hasItem = action !== "create";

      let title = hasItem
        ? `${this.$t(titleKey, item)} #${item.id}`
        : this.$t(titleKey);
      let id = hasItem ? item.id : null;

      /**
       * Get freshed item
       */
      let { data } = await this.getOne({
        resource: this.resource,
        params: { id: item.id },
      });
      this.$store.commit(`${this.resource}/setItem`, data);

      /**
       * Allows you to use `show` event for custom action on your side.
       * If event subscribed, it will force showing of `show` button even if no create action available for this resource.
       * This event will return a freshed item Object from your API.
       * @event show
       */
      /**
       * Allows you to use `edit` event for custom action on your side.
       * If event subscribed, it will force showing of `edit` button even if no create action available for this resource.
       * This event will return a freshed item Object from your API.
       * @event edit
       */
      /**
       * Allows you to use `create` event for custom action on your side.
       * If event subscribed, it will force showing of `clone` button even if no create action available for this resource.
       * This event will return a freshed item Object from your API for allowing prefill form create data.
       * @event create
       */
      this.$emit(action, { title, id, item: data });
    },
  },
};
</script>

<style>
.v-data-table tbody tr.v-data-table__expanded__content {
  box-shadow: none;
}

.v-data-table tbody tr.v-data-table__expanded__content td {
  padding: 1.5rem;
}

.v-data-table.clickable-rows tr {
  cursor: pointer;
}

.v-data-table .item-actions {
  white-space: nowrap;
}
</style>
