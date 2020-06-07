<template>
  <v-data-table
    :headers="headers"
    :items="listState.items"
    :show-select="!disableSelect"
    :disable-sort="disableSort"
    :value="listState.selected"
    :dense="dense"
    hide-default-footer
    :loading="listState.loading"
    :multi-sort="multiSort"
    :single-expand="singleExpand"
    :show-expand="showExpand"
    @click:row="onRowClick"
    :options.sync="listState.options"
    @input="(s) => (listState.selected = s)"
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
        :resource="listState.resource"
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
          name: `${listState.resource}_${field.link}`,
          params: { id: item.id },
        }"
      >
        <component
          v-if="field.type"
          :key="field.source"
          :is="`va-${field.type}-field`"
          :resource="listState.resource"
          :item="item"
          :source="field.source"
          v-bind="field.attributes"
          :truncate="150"
          v-slot="props"
        >
          <!--
            @slot Use for field cell templating.
            @binding {string} resource Name of resource.
            @binding {string} source Property source.
            @binding {string} item Full object item.
            @binding {string} value Value of property source.
          -->
          <slot
            :name="`field.${field.source}`"
            :item="props.item || item"
            v-bind="props"
          ></slot>
        </component>
        <slot v-else :name="`field.${field.source}`" v-bind="{ item, value }">
          {{ value }}
        </slot>
      </router-link>
      <component
        v-else-if="field.type"
        :key="field.source"
        :is="`va-${field.type}-field`"
        :resource="listState.resource"
        :item="item"
        :source="field.source"
        v-bind="field.attributes"
        :truncate="150"
        v-slot="props"
      >
        <slot
          :name="`field.${field.source}`"
          :item="props.item || item"
          v-bind="props"
        ></slot>
      </component>
      <slot v-else :name="`field.${field.source}`" v-bind="{ item, value }">
        {{ value }}
      </slot>
    </template>
    <template v-slot:item.actions="{ item }">
      <div class="item-actions">
        <!-- @slot Full cell template which contains all row actions -->
        <slot name="cell.actions" v-bind="{ item }">
          <va-show-button
            v-if="!disableShow"
            :disable-redirect="disableShowRedirect"
            :resource="listState.resource"
            :item="item"
            icon
            @click="(item) => onAction('show', item)"
          ></va-show-button>
          <va-edit-button
            v-if="!disableEdit"
            :disable-redirect="disableEditRedirect"
            :resource="listState.resource"
            :item="item"
            icon
            @click="(item) => onAction('edit', item)"
          ></va-edit-button>
          <!-- @slot Use it for additional custom row actions with components based on VaActionButton. -->
          <slot name="item.actions" v-bind="{ item }"></slot>
          <va-clone-button
            v-if="!disableClone"
            :disable-redirect="disableCreateRedirect"
            :resource="listState.resource"
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
            :resource="listState.resource"
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
            :resource="listState.resource"
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
import { mapActions } from "vuex";
import upperFirst from "lodash/upperFirst";

/**
 * Data table component, you will need data iterator as `VaList` in order to make it usable.
 * This component allows you to template all fields columns.
 */
export default {
  inject: {
    listState: { default: undefined },
  },
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
     * List of columns for each property of resource data.
     * Each column can be a simple string or a full object with advanced field properties.
     * Valid properties are `source`, `type`, `label`, `sortable`, `align`, `link`, `attributes`, `editable`.
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
     * Enable multi sort feature, enabled by default.
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
              this.$admin.getSourceLabel(this.listState.resource, f.source),
          };
        });
    },
  },
  watch: {
    multiSort: {
      handler(val) {
        this.listState.options.multiSort = val;
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions({
      getOne: "api/getOne",
    }),
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
            name: `${this.listState.resource}_show`,
            params: { id: item.id },
          });
          break;
        case "edit":
          this.$router.push({
            name: `${this.listState.resource}_edit`,
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

      let hasItem = action !== "create";

      let title = this.$admin
        .getResource(this.listState.resource)
        .getTitle(action, hasItem ? item : null);
      let id = hasItem ? item.id : null;

      /**
       * Get freshed item
       */
      let { data } = await this.getOne({
        resource: this.listState.resource,
        params: { id: item.id },
      });
      this.$store.commit(`${this.listState.resource}/setItem`, data);

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
