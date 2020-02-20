<template>
  <va-form>
    <va-tabbed-show :tabs="tabs">
      <template v-slot:[tab.id] v-for="tab in tabs">
        <slot :name="tab.id"></slot>
      </template>
      <template v-slot:footer>
        <va-form-save></va-form-save>
      </template>
    </va-tabbed-show>
  </va-form>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "TabbedForm",
  props: {
    tabs: Array
  }
};
</script>
