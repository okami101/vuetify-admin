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
        @click:clear="input = null"
      ></v-text-field>
    </template>
    <v-date-picker
      :value="getDate"
      @change="change"
      @input="updateDate"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import Input from "../../../mixins/input";

export default {
  mixins: [Input],
  props: {
    filled: {
      type: Boolean,
      default: true,
    },
    format: String,
  },
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    dateFormatted() {
      return this.input ? this.$d(new Date(this.input), this.format) : "";
    },
    getDate() {
      /**
       * Return ISO 8601
       */
      let date = new Date(this.input);

      let month = 1 + date.getMonth();
      if (month < 10) {
        month = `0${month}`;
      }
      let day = date.getDate();
      if (day < 10) {
        day = `0${day}`;
      }
      return `${date.getFullYear()}-${month}-${day}`;
    },
  },
  methods: {
    updateDate(val) {
      this.menu = false;
      this.update(val);
    },
  },
};
</script>
