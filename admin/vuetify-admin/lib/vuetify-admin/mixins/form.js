export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    resource: {
      type: String,
      required: true
    },
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
