import { mapState } from "vuex";

export default {
  props: {
    source: String,
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      record: this.item || {}
    };
  },
  computed: {
    ...mapState({
      resource: state => state.api.resource
    })
  },
  watch: {
    resource: {
      handler(val) {
        if (val) {
          this.record = val;
          return;
        }
        this.record = {};
      },
      immediate: true
    }
  }
};
