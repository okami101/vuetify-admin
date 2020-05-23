<template>
  <v-form ref="form" @submit.prevent="onSave">
    <!-- @slot All content form with all inner inputs. Model will be injected for each inputs. -->
    <slot></slot>
  </v-form>
</template>

<script>
import Resource from "../../mixins/resource";
import set from "lodash/set";

/**
 * Main form component which handle resource saving by calling `create` or `update` data provider methods.
 * Use injection which allowing unique global v-model for all inputs.
 * @displayName VaForm
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
     * Is model saving ?
     * Allows you to add loading spinner to submit button.
     */
    saving: Boolean,
    /**
     * Default route resource action to redirect after saving.
     * @values list, show, edit
     */
    redirect: {
      type: String,
      default: "list",
    },
    /**
     * Disable default redirect behavior
     */
    disableRedirect: Boolean,
  },
  data() {
    return {
      formState: {
        edit: !!this.id,
        item: this.item,
        model: {},
        errors: [],
        update: ({ source, value }) => {
          set(this.formState.model, source, value);

          /**
           * Send model update, called after each single input change.
           */
          this.$emit("input", this.formState.model);
        },
      },
    };
  },
  watch: {
    item(val) {
      this.formState.item = val;
    },
    value: {
      handler(val) {
        this.formState.model = val;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async onSave() {
      if (!this.$refs.form.validate()) {
        return;
      }

      /**
       * Synchronization event for `saving` prop.
       */
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

        /**
         * Sent after success saving.
         */
        this.$emit("saved");

        if (this.disableRedirect) {
          return;
        }

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
      } catch (e) {
        this.$emit("update:saving", false);

        if (e.data) {
          this.formState.errors = e.data.errors;
        }
      }
    },
  },
};
</script>
