<template>
  <v-form ref="form" @submit.prevent="onSave">
    <slot></slot>
  </v-form>
</template>

<script>
import EventBus from "vuetify-admin/utils/eventBus";
import Resource from "vuetify-admin/mixins/resource";
import set from "lodash/set";

export default {
  name: "Form",
  mixins: [Resource],
  provide() {
    return {
      formState: this.formState,
    };
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    id: [String, Number],
    item: {
      type: Object,
      default: () => {},
    },
    source: {
      type: Object,
      default: () => {},
    },
    name: {
      type: String,
      default: "VaForm",
    },
    saving: Boolean,
    redirect: {
      type: String,
      default: "list",
    },
    disableRedirect: Boolean,
  },
  data() {
    return {
      formState: {
        name: this.name,
        edit: !!this.id,
        item: this.item,
        model: this.value,
        errors: [],
      },
    };
  },
  created() {
    EventBus.$on("update-model", ({ name, source, value }) => {
      if (name === this.name) {
        let model = { ...this.value };
        set(model, source, value === undefined ? "" : value);
        this.$emit("input", model);
      }
    });
  },
  beforeDestroy() {
    EventBus.$off("update-model");
  },
  watch: {
    item(val) {
      this.formState.item = val;
    },
  },
  methods: {
    async onSave() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.$emit("update:saving", true);

      try {
        let { data } = this.id
          ? await this.$store.dispatch(`${this.resource}/update`, {
              id: this.id,
              data: this.value,
            })
          : await this.$store.dispatch(`${this.resource}/create`, {
              data: this.value,
            });

        this.$emit("update:saving", false);
        this.$emit("saved");

        if (!this.disableRedirect) {
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
        }
      } catch (e) {
        this.$emit("update:saving", false);

        if (e.response) {
          this.formState.errors = e.response.data.errors;
        }
      }
    },
  },
};
</script>
