<template>
  <v-form ref="form" @submit.prevent="onSave">
    <slot></slot>
  </v-form>
</template>

<script>
import EventBus from "vuetify-admin/utils/eventBus";
import Item from "vuetify-admin/mixins/item";
import set from "lodash/set";

export default {
  name: "Form",
  mixins: [Item],
  provide() {
    return {
      formName: this.name,
      formItem: this.item
    };
  },
  props: {
    name: {
      type: String,
      default: "VaForm"
    },
    saving: Boolean,
    redirect: {
      type: String,
      default: "list"
    }
  },
  data() {
    return {
      model: {}
    };
  },
  created() {
    EventBus.$on("update-model", ({ name, source, value }) => {
      if (name === this.name) {
        set(this.model, source, value === undefined ? "" : value);
      }
    });
  },
  beforeDestroy() {
    EventBus.$off("update-model");
  },
  methods: {
    async onSave() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.$emit("update:saving", true);

      try {
        let { data } = await this.$store.dispatch(
          `${this.resource}/save`,
          this.model
        );

        this.$emit("update:saving", false);

        switch (this.redirect) {
          case "list":
            this.$router.push(`/${this.resource}`);
            break;
          case "show":
            this.$router.push(`/${this.resource}/${data.id}`);
            break;
          case "edit":
            this.$router.push(`/${this.resource}/${data.id}/edit`);
            break;
        }
      } catch (e) {
        this.$emit("update:saving", false);

        if (e.response) {
          EventBus.$emit("form-errors", {
            name: this.name,
            errors: e.response.data.errors
          });
        }
      }
    }
  }
};
</script>
