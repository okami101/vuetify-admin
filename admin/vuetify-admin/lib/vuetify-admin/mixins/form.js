import RoutedResourceProps from "vuetify-admin/mixins/routedResourceProps";

export default {
  mixins: [RoutedResourceProps],
  props: {
    redirect: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onSaved() {
      if (this.redirect) {
        this.$router.push(`/${this.getResource}`);
      }
    }
  }
};
