<template>
  <v-form ref="form" @submit.prevent="onSave">
    <v-card>
      <va-tabbed-show :tabs="tabs">
        <template v-slot:[tab.id] v-for="tab in tabs">
          <slot :name="tab.id"></slot>
        </template>
      </va-tabbed-show>
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
  name: "TabbedForm",
  props: {
    tabs: Array,
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
