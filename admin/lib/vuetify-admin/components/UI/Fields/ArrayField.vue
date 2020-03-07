<template>
  <div>
    <slot :resource="resource" :items="value">
      {{ (value || []).map(v => render(v)).join(", ") }}
    </slot>
  </div>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "ArrayField",
  mixins: [Field],
  props: {
    render: {
      type: Function,
      default: v => v
    }
  }
};
</script>
