<template>
  <v-form
    ref="form"
    :style="{ 'max-width': `${width}px` }"
    @submit.prevent="onSave"
    v-model="valid"
    lazy-validation
  >
    <template v-for="field in fields">
      <v-textarea
        v-if="field.type === 'text'"
        :key="field.value"
        v-model="form[field.value]"
        :label="field.text"
        :rules="rules[field.value]"
        auto-grow
        filled
      ></v-textarea>
      <va-date-picker-input
        v-else-if="field.type === 'date'"
        :key="field.value"
        v-model="form[field.value]"
        :label="field.text"
        :rules="rules[field.value]"
        filled
      ></va-date-picker-input>
      <v-text-field
        v-else
        :key="field.value"
        v-model="form[field.value]"
        :label="field.text"
        :rules="rules[field.value]"
        filled
      ></v-text-field>
    </template>

    <v-btn :loading="saving" :disabled="!valid" color="primary" type="submit">
      <v-icon class="mr-2">mdi-floppy</v-icon>
      Save
    </v-btn>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

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
      valid: true,
      form: {},
      rules: {},
      resource: this.$route.meta.model
    };
  },
  watch: {
    fields: {
      handler(val) {
        /**
         * Init form model
         */
        val.forEach(field => {
          let { value, text } = field;
          let rules = [];

          if (field.required) {
            rules.push(v => !!v || `${text} is required`);
          }

          this.rules[value] = rules;

          if (this.resource) {
            this.form[value] = this.resource[value];
            return;
          }
          this.form[value] = null;
        });
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      create: "api/create",
      update: "api/update"
    }),
    async onSave() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.saving = true;

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

      this.saving = false;

      this.$router.push(`/${this.$route.meta.resource}`);
    }
  }
};
</script>
