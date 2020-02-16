<template>
  <span>
    <v-icon small v-for="i in record[source]" :key="i">mdi-star-circle</v-icon>
  </span>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "StarRatingField",
  mixins: [Field]
};
</script>
