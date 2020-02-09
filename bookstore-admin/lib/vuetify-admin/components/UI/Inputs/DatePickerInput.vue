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
        :label="label"
        :filled="filled"
        readonly
        append-icon="mdi-calendar"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
  </v-menu>
</template>

<script>
import format from "date-fns/format";

export default {
  name: "DatePickerInput",
  props: {
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      required: true
    },
    filled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menu: false,
      date: null
    };
  },
  computed: {
    dateFormatted() {
      return this.date ? format(new Date(this.date), "dd/MM/yyyy") : "";
    }
  },
  watch: {
    value: {
      handler(val) {
        this.date = new Date(val).toISOString().substr(0, 10);
      },
      immediate: true
    },
    date: {
      handler(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>
