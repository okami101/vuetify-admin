<template>
  <v-form ref="form" @submit.prevent="onSave">
    <va-tabbed-show :tabs="tabs">
      <template v-slot:[tab.id] v-for="tab in tabs">
        <slot :name="tab.id"></slot>
      </template>
      <template v-slot:footer>
        <v-toolbar flat color="grey lighten-4">
          <va-save-button></va-save-button>
          <v-spacer></v-spacer>
          <va-delete-button v-if="can('delete')"></va-delete-button>
        </v-toolbar>
      </template>
    </va-tabbed-show>
  </v-form>
</template>

<script>
import Form from "../../../mixins/form";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "TabbedForm",
  mixins: [Form],
  props: {
    tabs: Array
  }
};
</script>
