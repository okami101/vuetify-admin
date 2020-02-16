import { mapState } from "vuex";

export default {
  props: {
    source: String,
    value: String
  },
  computed: {
    ...mapState({
      resource: state => state.api.resource
    }),
    getValue() {
      return this.resource ? this.resource[this.source] : this.value;
    }
  }
};
