export default {
  props: {
    title: [String, Function]
  },
  data() {
    return {
      model: this.$route.meta.model
    };
  },
  created() {
    let label = this.model ? this.title(this.model) : this.title;

    this.$route.meta.label = label;
    document.title = label;
  }
};
