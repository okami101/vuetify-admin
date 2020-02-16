<template>
  <v-form
    ref="form"
    :style="{ 'max-width': `${width}px` }"
    @submit.prevent="onSave"
  >
    <template v-for="field in fields">
      <v-textarea
        v-if="field.type === 'text'"
        :key="field.source"
        v-model="form[field.source]"
        :label="getLabel(field)"
        :rules="rules[field.source]"
        :error-messages="errors[field.source]"
        auto-grow
        filled
      ></v-textarea>
      <va-date-picker-input
        v-else-if="field.type === 'date'"
        :key="field.source"
        v-model="form[field.source]"
        :label="getLabel(field)"
        :rules="rules[field.source]"
        :error-messages="errors[field.source]"
        filled
      ></va-date-picker-input>
      <v-text-field
        v-else
        :key="field.source"
        v-model="form[field.source]"
        :label="getLabel(field)"
        :rules="rules[field.source]"
        :error-messages="errors[field.source]"
        filled
      ></v-text-field>
    </template>

    <v-btn :loading="saving" color="primary" type="submit">
      <v-icon class="mr-2">mdi-floppy</v-icon>
      {{ $t("va.save") }}
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
      return field.text || this.$t(`attributes.${field.source}`);
    },
    init() {
      /**
       * Init form model
       */
      let form = {};

      this.fields
        .map(field => {
          return {
            label: this.$t(`attributes.${field.source}`),
            ...field
          };
        })
        .forEach(field => {
          let { source, label } = field;
          let rules = [];

          if (field.required) {
            rules.push(
              v => !!v || this.$t("va.forms.required_field", { field: label })
            );
          }

          this.rules[source] = rules;

          if (this.resource) {
            form[source] = this.resource[source];
            return;
          }
          form[source] = null;
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
