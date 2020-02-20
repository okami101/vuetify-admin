<template>
  <v-form ref="form" @submit.prevent="onSave">
    <slot></slot>
  </v-form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Form",
  computed: {
    ...mapState({
      resource: state => state.api.resource,
      resourceName: state => state.api.resourceName
    })
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
        await this.save();
        this.$router.push(`/${this.resourceName}`);
      } catch (e) {}
    }
  }
};
</script>
