<template>
  <v-form ref="form" @submit.prevent="onSave">
    <slot></slot>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Form",
  props: {
    resource: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions({
      save: "form/save"
    }),
    async onSave() {
      if (!this.$refs.form.validate()) {
        return;
      }

      try {
        await this.save(this.resource);
        this.$emit("saved");
      } catch (e) {}
    }
  }
};
</script>
