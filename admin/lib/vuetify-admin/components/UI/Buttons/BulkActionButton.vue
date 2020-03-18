<template>
  <v-tooltip bottom :disabled="showLabel">
    <template v-slot:activator="{ on }">
      <v-btn
        :icon="!showLabel"
        :text="text"
        :color="color"
        v-on="on"
        @click="onBlukUpdate"
      >
        <v-icon small>{{ icon }}</v-icon>
        <span v-if="showLabel" class="ml-2">
          {{ label }}
        </span>
      </v-btn>
    </template>
    <span>{{ label }}</span>
  </v-tooltip>
</template>

<script>
import Resource from "vuetify-admin/mixins/resource";
import { mapActions } from "vuex";

export default {
  name: "BulkActionButton",
  mixins: [Resource],
  props: {
    value: Array,
    action: {
      type: Object,
      required: true
    },
    icon: String,
    label: {
      type: String,
      required: true
    },
    showLabel: Boolean,
    color: {
      type: String,
      default: "primary"
    },
    text: Boolean
  },
  methods: {
    ...mapActions({
      updateMany: "api/updateMany",
      refresh: "api/refresh"
    }),
    async onBlukUpdate() {
      await this.updateMany({
        resource: this.resource,
        params: { ids: this.value.map(({ id }) => id), data: this.action }
      });
      this.$emit("input", []);
      this.refresh(this.resource);
    }
  }
};
</script>
