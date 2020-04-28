<template>
  <v-chip v-if="chip" :color="color" :small="small" :to="link">
    <slot :value="value">{{ text ? value[text] : value }}</slot>
  </v-chip>
  <router-link v-else :to="link">
    <slot :value="value">{{ text ? value[text] : value }}</slot>
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
    text: String,
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
