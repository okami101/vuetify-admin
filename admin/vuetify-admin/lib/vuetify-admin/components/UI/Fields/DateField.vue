<template>
  <va-field v-slot="record" v-bind="$props">
    <span>{{ dateFormatted(record[source]) }}</span>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";
import format from "date-fns/format";
import { fr } from "date-fns/locale";

export default {
  name: "DateField",
  mixins: [Field],
  props: {
    format: {
      type: String,
      default: "EEEE dd LLLL yyyy"
    }
  },
  methods: {
    dateFormatted(val) {
      return format(
        new Date(val),
        this.format,
        this.$i18n.locale === "fr" ? { locale: fr } : {}
      );
    }
  }
};
</script>
