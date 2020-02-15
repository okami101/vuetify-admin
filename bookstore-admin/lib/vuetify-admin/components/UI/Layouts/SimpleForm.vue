<template>
  <v-form
    v-if="resource"
    ref="form"
    :style="{ 'max-width': `${width}px` }"
    @submit.prevent="onSave"
  >
    <template v-for="field in fields">
      <v-textarea
        v-if="field.type === 'text'"
        :key="field.value"
        v-model="form[field.value]"
        :label="getLabel(field)"
        :rules="rules[field.value]"
        :error-messages="errors[field.value]"
        auto-grow
        filled
      ></v-textarea>
      <va-date-picker-input
        v-else-if="field.type === 'date'"
        :key="field.value"
        v-model="form[field.value]"
        :label="getLabel(field)"
        :rules="rules[field.value]"
        :error-messages="errors[field.value]"
        filled
      ></va-date-picker-input>
      <v-text-field
        v-else
        :key="field.value"
        v-model="form[field.value]"
        :label="getLabel(field)"
        :rules="rules[field.value]"
        :error-messages="errors[field.value]"
        filled
      ></v-text-field>
    </template>

    <v-btn :loading="saving" color="primary" type="submit">
      <v-icon class="mr-2">mdi-floppy</v-icon>
      Save
    </v-btn>
  </v-form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "SimpleForm",
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: 600
    }
  },
  data() {
    return {
      saving: false,
      form: {},
      rules: {},
      errors: {}
    };
  },
  computed: {
    ...mapState({
      resource: state => state.api.resource,
      resourceName: state => state.api.resourceName
    })
  },
  watch: {
    resource() {
      this.init();
    },
    fields: {
      handler() {
        this.init();
      },
      immediate: true
    }
  },
  methods: {
    getLabel(field) {
      return field.text || this.$t(`attributes.${field.value}`);
    },
    init() {
      /**
       * Init form model
       */
      let form = {};

      this.fields
        .map(field => {
          return {
            text: this.$t(`attributes.${field.value}`),
            ...field
          };
        })
        .forEach(field => {
          let { value, text } = field;
          let rules = [];

          if (field.required) {
            rules.push(v => !!v || `${text} is required`);
          }

          this.rules[value] = rules;

          if (this.resource) {
            form[value] = this.resource[value];
            return;
          }
          form[value] = null;
        });

      this.form = form;
    },
    ...mapActions({
      create: "api/create",
      update: "api/update"
    }),
    async onSave() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.saving = true;

      try {
        if (this.resource) {
          await this.update({
            id: this.resource.id,
            data: this.form
          });
        } else {
          await this.create({
            data: this.form
          });
        }

        this.$router.push(`/${this.resourceName}`);
      } catch ({ status, errors }) {
        if (status === 422) {
          this.errors = errors;
        }
      }

      this.saving = false;
    }
  }
};
</script>
