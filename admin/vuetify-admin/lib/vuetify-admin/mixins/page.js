import { mapState, mapMutations } from "vuex";

export default {
  props: {
    title: [String, Function]
  },
  computed: {
    ...mapState({
      item: state => state.api.resource,
      resourceName: state => state.api.resourceName
    }),
    getTitle() {
      if (!this.title) {
        return this.$route.meta.title;
      }
      return typeof this.title === "function"
        ? this.title(this.item)
        : this.title;
    }
  },
  watch: {
    title: {
      handler() {
        this.setTitle(this.getTitle);
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      setTitle: "api/setTitle"
    })
  }
};
