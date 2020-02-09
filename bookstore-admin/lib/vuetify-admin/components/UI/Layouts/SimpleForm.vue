<template>
  <v-form
    ref="form"
    :style="{ 'max-width': `${width}px` }"
    @submit.prevent="onSave"
  >
    <template v-for="field in fields">
      <v-textarea
        v-if="field.type === 'text'"
        :key="field.value"
        v-model="form[field.value]"
        :label="field.text"
        auto-grow
        filled
      ></v-textarea>
      <va-date-picker-input
        v-else-if="field.type === 'date'"
        :key="field.value"
        v-model="form[field.value]"
        :label="field.text"
        filled
      ></va-date-picker-input>
      <v-text-field
        v-else
        :key="field.value"
        v-model="form[field.value]"
        :label="field.text"
        filled
      ></v-text-field>
    </template>

    <v-btn :disabled="saving" color="primary" type="submit">
      <v-icon class="mr-2">mdi-floppy</v-icon>
      Save
    </v-btn>
  </v-form>
</template>

<script>
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
      resource: this.$route.meta.model
    };
  },
  created() {
    /**
     * Init form model
     */
    this.fields.forEach(({ value }) => {
      if (this.resource) {
        this.form[value] = this.resource[value];
        return;
      }
      this.form[value] = null;
    });
  },
  methods: {
    onSave() {
      console.log("ok");
    }
  }
};
</script>
