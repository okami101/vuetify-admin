<script>
export default {
  name: "FilterInput",
  props: {
    value: String,
    component: {
      type: Object,
      default: () => {}
    }
  },
  render(c) {
    this.component.componentOptions.propsData = {
      ...this.component.componentOptions.propsData,
      value: this.value,
      filter: true,
      singleLine: true,
      hideDetails: true,
      dense: true
    };

    this.component.componentOptions.listeners = {
      input: value => {
        this.$emit("input", value);
      }
    };

    return this.component;
  }
};
</script>
