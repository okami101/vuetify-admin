<template>
  <span v-if="value">
    <v-chip v-if="chip" :color="getColor(value)" :small="small" :to="link">
      <slot :value="value">{{ getItemText }}</slot>
    </v-chip>
    <router-link v-else :to="link">
      <!-- @slot Content placeholder for further customization, guess the resource text by default. -->
      <slot :value="value">{{ getItemText }}</slot>
    </router-link>
  </span>
</template>

<script>
import Field from "../../../mixins/field";
import Reference from "../../../mixins/reference";

/**
 * Display a reference link to another existing resource.
 */
export default {
  mixins: [Field, Reference],
  props: {
    /**
     * Show link as a chip.
     */
    chip: Boolean,
  },
  computed: {
    isPrimitiveValue() {
      return this.value !== Object(this.value);
    },
    link() {
      return {
        name: `${this.reference}_${this.action}`,
        params: {
          id: this.isPrimitiveValue ? this.value : this.value[this.itemValue],
        },
      };
    },
    getItemText() {
      let resource = this.$admin.getResource(this.reference);
      let text = this.itemText || resource.label;

      if (typeof text === "function") {
        return text(this.value);
      }
      return this.isPrimitiveValue
        ? this.value
        : this.value[text] || this.value;
    },
  },
};
</script>
