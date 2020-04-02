<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-icon v-if="value" v-on="on">{{ iconTrue }}</v-icon>
      <v-icon v-else v-on="on">{{ iconFalse }}</v-icon>
    </template>
    <span>{{ value ? $t(labelTrue) : $t(labelFalse) }}</span>
  </v-tooltip>
</template>

<script>
import Field from "vue-relay-admin/mixins/field";

export default {
  name: "BooleanField",
  mixins: [Field],
  props: {
    labelTrue: {
      type: String,
      default: "va.confirm.yes",
    },
    labelFalse: {
      type: String,
      default: "va.confirm.no",
    },
    iconTrue: {
      type: String,
      default: "mdi-check",
    },
    iconFalse: {
      type: String,
      default: "mdi-close",
    },
  },
};
</script>
