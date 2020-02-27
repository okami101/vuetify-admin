<template>
  <div>
    <slot :value="getLabel(value)">
      <span>{{ getLabel(value) }}</span>
    </slot>
  </div>
</template>

<script>
import Field from "vuetify-admin/mixins/field";
import Enum from "vuetify-admin/mixins/enum";

export default {
  name: "EnumField",
  mixins: [Field, Enum]
};
</script>
