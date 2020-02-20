<template>
  <v-form ref="form" @submit.prevent="onSave">
    <v-card>
      <v-card-text>
        <div :style="{ 'max-width': `${width}px` }">
          <slot></slot>
        </div>
      </v-card-text>
      <v-toolbar flat color="grey lighten-4">
        <va-save-button></va-save-button>
        <v-spacer></v-spacer>
        <va-delete-button v-if="can('delete')"></va-delete-button>
      </v-toolbar>
    </v-card>
  </v-form>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

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
      resource: state => state.api.resource,
      resourceName: state => state.api.resourceName
    }),
    ...mapGetters({
      can: "api/can"
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
