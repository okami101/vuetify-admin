<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="dateFormatted"
        :label="getLabel"
        :rules="getRules"
        :error-messages="errorMessages"
        readonly
        append-icon="mdi-calendar"
        v-on="on"
        clearable
        filled
        :single-line="singleLine"
        :hide-details="hideDetails"
        :dense="dense"
        @click:clear="input = null"
      ></v-text-field>
    </template>
    <v-date-picker v-model="input" @input="menu = false"></v-date-picker>
  </v-menu>
</template>

<script>
import Input from "vuetify-admin/mixins/input";
import format from "date-fns/format";

export default {
  name: "DateInput",
  mixins: [Input],
  props: {
    singleLine: Boolean,
    hideDetails: Boolean,
    dense: Boolean
  },
  data() {
    return {
      menu: false
    };
  },
  computed: {
    dateFormatted() {
      return this.input ? format(new Date(this.input), "dd/MM/yyyy") : "";
    }
  },
  watch: {
    input: {
      handler(val) {
        if (val) {
          this.input = format(new Date(val), "yyyy-MM-dd");
        }
      },
      immediate: true
    }
  }
};
</script>
