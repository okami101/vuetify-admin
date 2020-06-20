<template>
  <va-form :id="id" :item="item" disable-redirect @saved="$emit('saved')">
    <va-text-input source="name"></va-text-input>
    <va-text-input source="email" type="email"></va-text-input>
    <va-password-input source="password"></va-password-input>
    <va-password-input source="password_confirmation"></va-password-input>
    <va-save-button></va-save-button>
  </va-form>
</template>

<script>
export default {
  props: ["id", "item"],
};
</script>
