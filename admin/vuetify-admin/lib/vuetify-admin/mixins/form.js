import Item from "vuetify-admin/mixins/item";
import { mapMutations } from "vuex";

export default {
  mixins: [Item],
  props: {
    redirect: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.reset();
  },
  methods: {
    ...mapMutations({
      reset: "form/reset"
    }),
    onSaved() {
      if (this.redirect) {
        this.$router.push(`/${this.resource}`);
      }
    }
  }
};
