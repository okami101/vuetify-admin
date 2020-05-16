<template>
  <v-form ref="form" @submit.prevent="onSave">
    <slot></slot>
  </v-form>
</template>

<script>
import Resource from "../../../mixins/resource";
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
    saving: Boolean,
    redirect: {
      type: String,
      default: "list",
    },
    disableRedirect: Boolean,
  },
  data() {
    return {
      model: this.value,
      formState: {
        edit: !!this.id,
        item: this.item,
        errors: [],
        update: ({ source, value }) => {
          set(this.model, source, value === undefined ? "" : value);
          this.$emit("input", this.model);
        },
      },
    };
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
              this.$router.push({ name: `${this.resource}_list` });
              break;
            case "show":
              this.$router.push({
                name: `${this.resource}_show`,
                params: { id: data.id },
              });
              break;
            case "edit":
              this.$router.push({
                name: `${this.resource}_edit`,
                params: { id: data.id },
              });
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
