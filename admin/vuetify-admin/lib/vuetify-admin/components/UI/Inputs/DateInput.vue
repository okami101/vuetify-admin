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
        v-bind="commonProps"
        readonly
        append-icon="mdi-calendar"
        v-on="on"
        :filled="filled"
        :single-line="singleLine"
        @click:clear="input = null"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="input"
      @input="menu = false"
      @change="change"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "DateInput",
  mixins: [Input],
  props: {
    singleLine: Boolean,
    filled: {
      type: Boolean,
      default: true
    },
    format: String
  },
  data() {
    return {
      menu: false
    };
  },
  computed: {
    dateFormatted() {
      return this.input ? this.$d(new Date(this.input), this.format) : "";
    }
  },
  watch: {
    input: {
      handler(val) {
        if (val) {
          this.input = val.substring(0, 10);
        }
      },
      immediate: true
    }
  }
};
</script>
