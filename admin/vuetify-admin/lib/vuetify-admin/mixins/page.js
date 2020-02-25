import RoutedResourceProps from "vuetify-admin/mixins/routedResourceProps";
import { mapMutations } from "vuex";

export default {
  mixins: [RoutedResourceProps],
  props: {
    title: [String, Function]
  },
  computed: {
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
      setTitle: "layout/setTitle"
    })
  }
};
