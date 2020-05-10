<template>
  <v-chip v-if="chip" :color="color" :small="small" :to="link">
    <slot :value="value">{{ optionText ? value[optionText] : value }}</slot>
  </v-chip>
  <router-link v-else :to="link">
    <slot :value="value">{{ optionText ? value[optionText] : value }}</slot>
  </router-link>
</template>

<script>
import Field from "../../../mixins/field";

export default {
  name: "ReferenceField",
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
    optionText: {
      type: [String, Array, Function],
      default: "name",
    },
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
  },
};
</script>
