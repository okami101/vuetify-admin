<script>
import { VInput } from "vuetify/lib";
import { mapState } from "vuex";

export default {
  name: "Field",
  components: {
    VInput
  },
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
      return c("v-input", this.$scopedSlots.default(this.record));
    }

    return c(
      "v-input",
      {
        props: {
          label: this.getLabel
        }
      },
      [c("div", { class: "va-field" }, this.$scopedSlots.default(this.record))]
    );
  }
};
</script>

<style lang="scss" scoped>
::v-deep .v-input__slot {
  display: block;
}
::v-deep .v-label {
  display: inline-block;
  margin-bottom: 0.5rem;
}
</style>
