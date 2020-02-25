import Item from "vuetify-admin/mixins/item";

export default {
  mixins: [Item],
  props: {
    redirect: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onSaved() {
      if (this.redirect) {
        this.$router.push(`/${this.resource}`);
      }
    }
  }
};
