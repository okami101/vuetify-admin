import PageLayout from "../components/Layouts/PageLayout";

export default {
  components: {
    PageLayout
  },
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
