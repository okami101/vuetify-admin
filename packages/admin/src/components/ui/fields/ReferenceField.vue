<template>
  <v-chip v-if="chip" :color="color" :small="small" :to="link">
    <slot :value="value">{{ getItemText }}</slot>
  </v-chip>
  <router-link v-else :to="link">
    <slot :value="value">{{ getItemText }}</slot>
  </router-link>
</template>

<script>
import Field from "../../../mixins/field";

export default {
  mixins: [Field],
  props: {
    action: {
      type: String,
      validator: (v) => ["show", "edit"].includes(v),
      default: "show",
    },
    reference: {
      type: String,
      required: true,
    },
    itemText: [String, Array, Function],
    chip: Boolean,
    color: String,
    small: Boolean,
  },
  computed: {
    link() {
      return {
        name: `${this.reference}_${this.action}`,
        params: { id: this.value.id },
      };
    },
    getItemText() {
      let resource = this.$admin.getResource(this.reference);
      let text = this.itemText || resource.label;

      if (typeof text === "function") {
        return text(this.value);
      }
      return this.value[text];
    },
  },
};
</script>
