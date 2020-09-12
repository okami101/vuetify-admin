import Vue from "vue";
import {
  VAutocomplete,
  VCombobox,
  VTreeview,
  VTreeviewNode,
} from "vuetify/lib";

import { getObjectValueByPath } from "vuetify/lib/util/helpers";

/**
 * Add draggable feature to Vuetify Treeview
 */
const VDraggableTreeviewNode = VTreeviewNode.extend({
  props: {
    draggable: Boolean,
    handle: String,
  },
  methods: {
    genChild(item, parentIsDisabled) {
      return this.$createElement(VDraggableTreeviewNode, {
        key: getObjectValueByPath(item, this.itemKey),
        props: {
          activatable: this.activatable,
          activeClass: this.activeClass,
          item,
          selectable: this.selectable,
          selectedColor: this.selectedColor,
          color: this.color,
          expandIcon: this.expandIcon,
          indeterminateIcon: this.indeterminateIcon,
          offIcon: this.offIcon,
          onIcon: this.onIcon,
          loadingIcon: this.loadingIcon,
          itemKey: this.itemKey,
          itemText: this.itemText,
          itemDisabled: this.itemDisabled,
          itemChildren: this.itemChildren,
          loadChildren: this.loadChildren,
          transition: this.transition,
          openOnClick: this.openOnClick,
          rounded: this.rounded,
          shaped: this.shaped,
          level: this.level + 1,
          selectionType: this.selectionType,
          draggable: this.draggable,
          handle: this.handle,
          parentIsDisabled,
        },
        scopedSlots: this.$scopedSlots,
      });
    },
    genChildrenWrapper() {
      const children = [
        this.children.map((c) =>
          !this.isOpen || !this.children
            ? this.$createElement("div")
            : this.genChild(c, this.disabled)
        ),
      ];

      return this.$createElement(
        "draggable",
        {
          props: {
            list: this.item.children,
          },
          attrs: {
            group: "description",
            disabled: !this.draggable,
            handle: this.handle,
          },
          staticClass: "v-treeview-node__children",
          on: {
            change: (e) => {
              if (!this.isOpen) {
                this.open();
              }
              this.treeview.onChange(e, this);
            },
          },
        },
        children
      );
    },
  },
});

const VDraggableTreeview = VTreeview.extend({
  props: {
    draggable: Boolean,
    handle: String,
  },
  methods: {
    onChange(e, node = null) {
      if (e.added) {
        this.$emit("change", { ...e.added, parent: node ? node.item : null });
      }
      if (e.moved) {
        this.$emit("change", { ...e.moved, parent: node ? node.item : null });
      }
    },
  },
  render(h) {
    const children = this.items.length
      ? this.items
          .filter((item) => {
            return !this.isExcluded(getObjectValueByPath(item, this.itemKey));
          })
          .map((item) => {
            const genChild = VDraggableTreeviewNode.options.methods.genChild.bind(
              this
            );
            return genChild(
              item,
              getObjectValueByPath(item, this.itemDisabled)
            );
          })
      : /* istanbul ignore next */
        this.$slots.default; // TODO: remove type annotation with TS 3.2

    return h(
      "draggable",
      {
        props: {
          list: this.items,
        },
        attrs: {
          group: "description",
          disabled: !this.draggable,
          handle: this.handle,
        },
        staticClass: "v-treeview",
        class: {
          "v-treeview--hoverable": this.hoverable,
          "v-treeview--dense": this.dense,
          ...this.themeClasses,
        },
        on: {
          change: (e) => {
            this.onChange(e);
          },
        },
      },
      children
    );
  },
});

/**
 * Explicit registering of this components because dynamic
 */
Vue.component("VAutocomplete", VAutocomplete);
Vue.component("VCombobox", VCombobox);
Vue.component("VDraggableTreeview", VDraggableTreeview);
