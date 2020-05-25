<template>
  <va-form
    :id="id"
    :item="item"
    :saving.sync="saving"
    disable-redirect
    @saved="$emit('saved')"
  >
    <va-text-input source="name"></va-text-input>
    <va-text-input source="email" type="email"></va-text-input>
    <va-password-input source="password"></va-password-input>
    <va-password-input source="password_confirmation"></va-password-input>
    <va-boolean-input source="active"></va-boolean-input>
    <va-select-input source="roles" multiple v-model="roles"></va-select-input>
    <va-autocomplete-input
      source="publishers"
      model="publisher_ids"
      multiple
      reference="publishers"
      v-if="roles && roles.includes('editor')"
    ></va-autocomplete-input>
    <va-autocomplete-input
      source="authors"
      model="author_ids"
      multiple
      reference="authors"
      v-if="roles && roles.includes('author')"
    ></va-autocomplete-input>
    <va-save-button :saving="saving"></va-save-button>
  </va-form>
</template>

<script>
export default {
  props: ["id", "item"],
  data() {
    return {
      roles: [],
      saving: false,
      model: {
        active: true,
      },
    };
  },
};
</script>
