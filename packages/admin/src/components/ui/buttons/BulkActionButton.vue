<template>
  <va-action-button
    :show-label="showLabel"
    :label="label"
    :icon="!showLabel"
    :text="text"
    :color="color || 'primary'"
    @click="onBlukUpdate"
  ></va-action-button>
</template>

<script>
import Resource from "../../../mixins/resource";
import { mapActions } from "vuex";

export default {
  mixins: [Resource],
  props: {
    value: Array,
    action: {
      type: Object,
      required: true,
    },
    icon: String,
    label: {
      type: String,
      required: true,
    },
    showLabel: Boolean,
    color: String,
    text: Boolean,
  },
  methods: {
    ...mapActions({
      updateMany: "api/updateMany",
      refresh: "api/refresh",
    }),
    async onBlukUpdate() {
      await this.updateMany({
        resource: this.resource,
        params: { ids: this.value.map(({ id }) => id), data: this.action },
      });
      this.$emit("input", []);
      this.refresh(this.resource);
    },
  },
};
</script>
