<template>
  <va-form
    :id="id"
    :item="item"
    disable-redirect
    @saved="$emit('saved')"
    v-model="model"
  >
    <va-text-input source="name"></va-text-input>
    <va-text-input source="email" type="email"></va-text-input>
    <va-password-input source="password"></va-password-input>
    <va-password-input source="password_confirmation"></va-password-input>
    <va-boolean-input source="active"></va-boolean-input>
    <va-select-input source="roles" multiple></va-select-input>
    <va-autocomplete-input
      source="publishers"
      model="publisher_ids"
      multiple
      reference="publishers"
      v-if="hasRole('editor')"
    ></va-autocomplete-input>
    <va-autocomplete-input
      source="authors"
      model="author_ids"
      multiple
      reference="authors"
      v-if="hasRole('author')"
    ></va-autocomplete-input>
    <va-save-button></va-save-button>
  </va-form>
</template>

<script>
export default {
  props: ["id", "item"],
  data() {
    return {
      model: {
        active: true,
        roles: [],
      },
    };
  },
  methods: {
    hasRole(role) {
      return (this.model.roles || []).includes(role);
    },
  },
};
</script>
