import Resource from "vuetify-admin/mixins/resource";
import isEmpty from "lodash/isEmpty";
import { mapGetters } from "vuex";

export default {
  mixins: [Resource],
  props: {
    item: {
      type: [String, Object],
      default: () => {}
    }
  },
  computed: {
    ...mapGetters({
      getItem: "api/item"
    }),
    record() {
      return this.item || this.getItem(this.resource);
    }
  }
};
