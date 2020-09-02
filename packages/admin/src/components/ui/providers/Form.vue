<template>
  <v-form ref="form" @submit.prevent="onSubmit">
    <!-- @slot All content form with all inner inputs. Model will be injected for each inputs. -->
    <slot></slot>
  </v-form>
</template>

<script>
import Resource from "../../../mixins/resource";
import set from "lodash/set";

/**
 * Form component which handle resource saving by calling `create` or `update` data provider methods.
 * It's the better place for made heavy usage of any VA inputs.
 * Use injection which allowing unique global v-model for all inputs.
 */
export default {
  mixins: [Resource],
  provide() {
    return {
      formState: this.formState,
    };
  },
  props: {
    /**
     * Current form model being edited. Represent the final data that will be send through your API.
     * @model
     */
    value: {
      type: Object,
      default: () => {},
    },
    /**
     * Id of resource to be edit. If null, then create a new one.
     */
    id: [String, Number],
    /**
     * Explicit item resource object where all properties must be injected into form model.
     */
    item: {
      type: Object,
      default: () => {},
    },
    /**
     * Default route resource action to redirect after saving.
     * @values list, create, show, edit
     */
    redirect: {
      type: String,
      validator: (v) => ["list", "create", "show", "edit"].includes(v),
      default: "list",
    },
    /**
     * Disable default redirect behavior
     */
    disableRedirect: Boolean,
  },
  data() {
    return {
      originalValue: this.value,
      formState: {
        edit: !!this.id,
        item: this.item,
        model: {},
        saving: false,
        errors: {},
        update: ({ source, value }) => {
          let model = { ...this.formState.model };
          set(model, source, value);

          this.formState.model = model;

          /**
           * Send model update, called after each single input change.
           */
          this.$emit("input", model);
        },
        submit: (redirect) => {
          this.save(redirect);
        },
      },
    };
  },
  watch: {
    item(val) {
      if (!val) {
        this.formState.model = this.originalValue;
      }
      this.formState.item = val;
    },
    value: {
      handler(val) {
        if (val) {
          this.formState.model = val;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    onSubmit() {
      if (this.disableRedirect) {
        this.save();
        return;
      }
      this.save(this.redirect);
    },
    async save(redirect) {
      if (!this.$refs.form.validate()) {
        return;
      }

      /**
       * Set saving to childs.
       */
      this.formState.saving = true;

      try {
        let { data } = this.id
          ? await this.$store.dispatch(`${this.resource}/update`, {
              id: this.id,
              data: this.formState.model,
            })
          : await this.$store.dispatch(`${this.resource}/create`, {
              data: this.formState.model,
            });

        this.formState.errors = {};

        /**
         * Sent after success saving.
         */
        this.$emit("saved");

        switch (redirect) {
          case "list":
            this.$router.push({ name: `${this.resource}_list` });
            break;
          case "create":
            // Reset form in case of same route
            this.formState.item = null;
            this.formState.model = this.originalValue;

            this.$router.push({ name: `${this.resource}_create` });
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
      } catch (e) {
        if (e.errors) {
          this.formState.errors = e.errors;
        }
      } finally {
        this.formState.saving = false;
      }
    },
  },
};
</script>
