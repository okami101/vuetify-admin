<template>
  <div>
    <slot :resource="resource" :items="value">
      {{ (value || []).join(", ") }}
    </slot>
  </div>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "ArrayField",
  mixins: [Field]
};
</script>
