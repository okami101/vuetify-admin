<script>
export default {
  name: "DataCell",
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
      addLabel: false,
      item: this.item
    };

    return this.component;
  }
};
</script>
