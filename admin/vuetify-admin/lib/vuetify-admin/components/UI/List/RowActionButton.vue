<script>
export default {
  name: "RowActionButton",
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    component: {
      type: Object,
      default: () => {}
    }
  },
  render(c) {
    this.component.componentOptions.propsData = {
      ...this.component.componentOptions.propsData,
      resource: this.item
    };

    this.component.componentOptions.listeners = {
      deleted: () => {
        this.$emit("deleted");
      }
    };

    return this.component;
  }
};
</script>
