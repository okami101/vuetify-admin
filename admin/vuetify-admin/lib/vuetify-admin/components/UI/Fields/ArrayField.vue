<template>
  <div>
    <slot :resource="resource" :items="items">
      {{ (value || []).join(", ") }}
    </slot>
  </div>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "ArrayField",
  mixins: [Field],
  computed: {
    items() {
      return this.value;
    }
  }
};
</script>
