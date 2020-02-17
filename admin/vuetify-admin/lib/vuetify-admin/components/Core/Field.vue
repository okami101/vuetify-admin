<script>
import { mapState } from "vuex";

export default {
  name: "Field",
  props: {
    source: String,
    label: String,
    item: {
      type: Object,
      default: () => {}
    },
    addLabel: {
      type: Boolean,
      default: true
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
    }),
    getLabel() {
      return this.label || this.$t(`attributes.${this.source}`);
    }
  },
  watch: {
    resource: {
      handler(val) {
        if (this.item) {
          return;
        }
        if (val) {
          this.record = val;
          return;
        }
        this.record = {};
      },
      immediate: true
    }
  },
  render(c) {
    if (this.item) {
      return this.$scopedSlots.default(this.record);
    }

    if (!this.addLabel) {
      return c(
        "div",
        {
          class: "mb-4"
        },
        this.$scopedSlots.default(this.record)
      );
    }

    return c(
      "div",
      {
        class: "mb-4"
      },
      [
        c(
          "label",
          {
            class: "font-weight-bold"
          },
          this.getLabel
        ),
        c("div", this.$scopedSlots.default(this.record))
      ]
    );
  }
};
</script>
