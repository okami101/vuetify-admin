<template>
  <va-form :resource="getResource" @saved="onSaved">
    <va-tabbed-show :tabs="tabs">
      <template v-slot:[tab.id] v-for="tab in tabs">
        <slot :name="tab.id"></slot>
      </template>
      <template v-slot:footer>
        <va-form-save :resource="getResource" :item="record"></va-form-save>
      </template>
    </va-tabbed-show>
  </va-form>
</template>

<script>
import Form from "vuetify-admin/mixins/form";

export default {
  name: "TabbedForm",
  mixins: [Form],
  props: {
    tabs: Array
  }
};
</script>
