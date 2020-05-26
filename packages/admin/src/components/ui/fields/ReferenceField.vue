<template>
  <v-chip v-if="chip" :color="getColor(value)" :small="small" :to="link">
    <slot :value="value">{{ getItemText }}</slot>
  </v-chip>
  <router-link v-else :to="link">
    <!-- @slot Content placeholder for further customization, guess the resource text by default. -->
    <slot :value="value">{{ getItemText }}</slot>
  </router-link>
</template>

<script>
import Field from "../../../mixins/field";
import Chip from "../../../mixins/chip";

/**
 * Field with a reference link to another existing resource.
 */
export default {
  mixins: [Field, Chip],
  props: {
    /**
     * Name of resource to link into.
     */
    reference: {
      type: String,
      required: true,
    },
    /**
     * Default CRUD page to link.
     * @values show, edit
     */
    action: {
      type: String,
      validator: (v) => ["show", "edit"].includes(v),
      default: "show",
    },
    /**
     * Property used for stringify inner targetted resource.
     * Use a function for further stringify customization.
     * If nothing set, use the global label property resource by default.
     */
    itemText: [String, Array, Function],
    /**
     * Attribute where taking the id value for link building.
     */
    itemValue: {
      type: String,
      default: "id",
    },
    /**
     * Show link as a chip.
     */
    chip: Boolean,
  },
  computed: {
    link() {
      return {
        name: `${this.reference}_${this.action}`,
        params: { id: this.value[this.itemValue] },
      };
    },
    getItemText() {
      let resource = this.$admin.getResource(this.reference);
      let text = this.itemText || resource.label;

      if (typeof text === "function") {
        return text(this.value);
      }
      return this.value[text] || this.value;
    },
  },
};
</script>
