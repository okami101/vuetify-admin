<template>
  <va-field v-slot="record" v-bind="$props">
    <v-rating :value="record[source]" readonly dense></v-rating>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "RatingField",
  mixins: [Field]
};
</script>
