<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :show-select="!disableSelect"
    :disable-sort="disableSort"
    :value="value"
    :dense="dense"
    hide-default-footer
    :options.sync="currentOptions"
    :loading="loading"
    :multi-sort="multiSort"
    :server-items-length="serverItemsLength"
    :single-expand="singleExpand"
    :show-expand="showExpand"
    @click:row="onRowClick"
    @update:sort-desc="updateOptions"
    @input="onSelect"
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
        :source="field.source"
        editable
        :item="item"
        :value="value"
        dense
        label=""
        v-bind="field.attributes"
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
          :source="field.source"
          v-bind="field.attributes"
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
        :source="field.source"
        v-bind="field.attributes"
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
    <template v-slot:item.actions="{ item }">
      <div class="item-actions">
        <!-- @slot Full cell template which contains all row actions -->
        <slot name="cell.actions" v-bind="{ resource, item }">
          <va-show-button
            v-if="!disableShow"
            :disable-redirect="disableShowRedirect"
            :resource="resource"
            :item="item"
            icon
            @click="(item) => onAction('show', item)"
          ></va-show-button>
          <va-edit-button
            v-if="!disableEdit"
            :disable-redirect="disableEditRedirect"
            :resource="resource"
            :item="item"
            icon
            @click="(item) => onAction('edit', item)"
          ></va-edit-button>
          <!-- @slot Use it for additional custom row actions with components based on VaActionButton. -->
          <slot name="item.actions" v-bind="{ resource, item }"></slot>
          <va-clone-button
            v-if="!disableClone"
            :disable-redirect="disableCreateRedirect"
            :resource="resource"
            :item="item"
            icon
            @click="(item) => onAction('create', item)"
          ></va-clone-button>
          <!--
            Triggered on successful dissociation of resource item.
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
            Triggered on successful deletetion of ressource item.
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
        <!-- @slot Place for full width cell which contains additional item infos. Visible when row is expanded. -->
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
 * Dumb datatable component, you will need data iterator as VaDataIterator in order to make it usable.
 * This component allows you to template all fields columns.
 * @displayName VaDataTable
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
    /**
     * List of current selected items.
     */
    value: {
      type: Array,
      default: () => [],
    },
    /**
     * List of columns for each property of resource data.
     * Each column can be a simple string or a full object with advanced field properties.
     * A specific `sortable` property can be setted if you need the column to be sortable.
     * By default all text, date and number will be sortable.
     * A specific `align` property can be setted with "left", "center", "right".
     * By default all number fields are aligned to right.
     * If you set `editable`, the input version will be rendered instead of field.
     * That will allow quick live edit on fly.
     */
    fields: {
      type: Array,
      default: () => [],
    },
    /**
     * Reduce height of each row.
     */
    dense: Boolean,
    /**
     * Put the datatable on a loading state. Used by VaDataIterator while loading data.
     */
    loading: Boolean,
    /**
     * Enable multisort feature, enabled by default.
     */
    multiSort: {
      type: Boolean,
      default: true,
    },
    /**
     * Enable row expand mode.
     * Use it for quick detail view.
     */
    showExpand: Boolean,
    /**
     * Only one row can expanded at once
     */
    singleExpand: {
      type: Boolean,
      default: true,
    },
    /**
     * Vuetify context state of the list with current page and sorting.
     * Should by synchronized with VaDataIterator.
     * DataTable manage only sorting here.
     */
    options: {
      type: Object,
      default: () => {},
    },
    /**
     * Total of items on server side, prefilled from VaDataIterator by `total` return by data provider.
     * Disable client-side sorting if setted.
     */
    serverItemsLength: Number,
    /**
     * Disable select feature.
     */
    disableSelect: Boolean,
    /**
     * Disable sorting.
     */
    disableSort: Boolean,
    /**
     * Disable show action row.
     */
    disableShow: Boolean,
    /**
     * Disable show action row.
     */
    disableEdit: Boolean,
    /**
     * Disable clone action row.
     */
    disableClone: Boolean,
    /**
     * Disable delete action row.
     */
    disableDelete: Boolean,
    /**
     * Disable actions column.
     */
    disableActions: Boolean,
    /**
     * Disable create redirection. Will force clone button to show.
     */
    disableCreateRedirect: Boolean,
    /**
     * Disable show redirection. Will force show button to show.
     */
    disableShowRedirect: Boolean,
    /**
     * Disable edit redirection. Will force edit button to show.
     */
    disableEditRedirect: Boolean,
    /**
     * Association infos object in case of this list is related to a current show or edit resource page.
     * Enable the dissociation between resources directly by an additional dissociation action.
     */
    association: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      currentOptions: {},
    };
  },
  computed: {
    headers() {
      let fields = this.getFields.map((field) => {
        return {
          text: field.label,
          value: field.source,
          sortable: field.sortable,
          align: field.align || this.getDefaultAlign(field),
        };
      });

      if (!this.disableActions) {
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
  watch: {
    options: {
      handler(val) {
        this.currentOptions = {
          ...val,
          multiSort: this.multiSort,
        };
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions({
      getOne: "api/getOne",
    }),
    onSelect(selected) {
      /**
       * Triggered when item is selected via checkbox selection.
       * Synchronize it with VaDataIterator for enabling bulk action context.
       */
      this.$emit("input", selected);
    },
    updateOptions() {
      /**
       * Triggered on sorting change
       */
      this.$emit("update:options", this.currentOptions);
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
      if (!this[`disable${upperFirst(action)}Redirect`]) {
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
       * Triggered on action on specific row.
       * This event will return a freshed item Object from your API.
       */
      this.$emit("item-action", { action, title, id, item: data });
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
