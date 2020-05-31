<template>
  <span class="address-field" v-if="value">
    {{ value.street }} {{ value.zipcode }} {{ value.city }}
  </span>
</template>

<script>
import Field from "vtec-admin/src/mixins/field";

export default {
  mixins: [Field],
};
</script>
