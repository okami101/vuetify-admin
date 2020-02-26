<script>
import { VInput } from "vuetify/lib";

export default {
  name: "Field",
  components: {
    VInput
  },
  props: {
    label: String,
    inline: Boolean,
    addLabel: Boolean
  },
  render(c) {
    if (this.inline) {
      return this.$slots.default;
    }

    if (!this.addLabel) {
      return c("v-input", this.$slots.default);
    }

    return c(
      "v-input",
      {
        props: {
          label: this.label
        }
      },
      [c("div", { class: "va-field" }, this.$slots.default)]
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
