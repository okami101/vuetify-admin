<template>
  <v-chip v-if="chip" :color="color" :small="small" :to="reference">
    <slot>{{ text ? value[text] : value }}</slot>
  </v-chip>
  <router-link v-else :to="reference">
    <slot>{{ text ? value[text] : value }}</slot>
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
    text: String,
    chip: Boolean,
    color: String,
    small: Boolean,
  },
  computed: {
    reference() {
      return {
        name: `${this.resource}_${this.action}`,
        params: { id: this.value.id },
      };
    },
  },
};
</script>
