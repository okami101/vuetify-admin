<template>
  <div>
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
  </div>
</template>

<script>
import Input from "../../../mixins/input";
import Editable from "../../../mixins/editable";

/**
 * Use for date type value editing. Is composed of a readonly textfield associated to a vuetify datepicker.
 * Do not support time, use classic VaTextInput in that case.
 */
export default {
  mixins: [Input, Editable],
  props: {
    /**
     * Date on ISO format to be edited.
     * @model
     */
    value: {
      type: String,
      default() {
        return this.$d(new Date(), this.format);
      },
    },
    /**
     * Use full filled background color style.
     */
    filled: {
      type: Boolean,
      default: true,
    },
    /**
     * Name of date format to use for textfield input.
     * Must be predefined on your VueI18n plugin.
     */
    format: {
      type: String,
      default() {
        return this.$admin.options.dateFormat;
      },
    },
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
      let date = this.input ? new Date(this.input) : new Date();

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
