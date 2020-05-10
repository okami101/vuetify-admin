<template>
  <va-form
    :id="id"
    :item="item"
    :saving.sync="saving"
    disable-redirect
    @saved="$emit('saved')"
    v-model="model"
  >
    <va-text-input source="name"></va-text-input>
    <va-text-input source="email" type="email"></va-text-input>
    <va-password-input source="password"></va-password-input>
    <va-password-input source="password_confirmation"></va-password-input>
    <va-save-button :saving="saving"></va-save-button>
  </va-form>
</template>

<script>
export default {
  props: ["id", "item"],
  data() {
    return {
      saving: false,
      model: {},
    };
  },
};
</script>
