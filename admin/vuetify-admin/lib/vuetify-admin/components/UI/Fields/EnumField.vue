<template>
  <div>
    <slot :value="label">
      <span>{{ label }}</span>
    </slot>
  </div>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "EnumField",
  mixins: [Field],
  computed: {
    label() {
      return this.value
        ? this.$t(
            `resources.${this.resource}.enums.${this.source}.${this.value}`
          )
        : "";
    }
  }
};
</script>
