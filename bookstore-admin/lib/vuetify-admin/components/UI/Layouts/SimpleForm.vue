<template>
  <v-form
    ref="form"
    :style="{ 'max-width': `${width}px` }"
    @submit.prevent="onSave"
  >
    <slot></slot>
    <va-save-button></va-save-button>
  </v-form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "SimpleForm",
  props: {
    width: {
      type: Number,
      default: 600
    }
  },
  computed: {
    ...mapState({
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

      await this.save();
      this.$router.push(`/${this.resourceName}`);
    }
  }
};
</script>
