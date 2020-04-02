import Resource from "vue-relay-admin/mixins/resource";
export default {
  mixins: [Resource],
  props: {
    item: null,
  },
  computed: {
    record() {
      return this.item || this.$store.state[this.resource].item;
    },
  },
};
