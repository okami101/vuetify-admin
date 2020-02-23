<template>
  <va-field v-slot="record" v-bind="$props">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon v-if="record[source]" v-on="on">{{ iconTrue }}</v-icon>
        <v-icon v-else v-on="on">{{ iconFalse }}</v-icon>
      </template>
      <span>{{ record[source] ? $t(labelTrue) : $t(labelFalse) }}</span>
    </v-tooltip>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "BooleanField",
  mixins: [Field],
  props: {
    labelTrue: {
      type: String,
      default: "va.confirm.yes"
    },
    labelFalse: {
      type: String,
      default: "va.confirm.no"
    },
    iconTrue: {
      type: String,
      default: "mdi-check"
    },
    iconFalse: {
      type: String,
      default: "mdi-close"
    }
  }
};
</script>
