<template>
  <va-form :id="id" :item="item" :saving.sync="saving">
    <va-text-input source="name"></va-text-input>
    <va-text-input source="email" type="email"></va-text-input>
    <va-boolean-input source="active"></va-boolean-input>
    <va-select-input
      source="roles"
      enum
      multiple
      v-model="roles"
    ></va-select-input>
    <va-autocomplete-input
      source="publishers"
      model="publisher_ids"
      multiple
      reference="publishers"
      option-text="name"
      v-if="roles.includes('editor')"
    ></va-autocomplete-input>
    <va-autocomplete-input
      source="authors"
      model="author_ids"
      multiple
      reference="authors"
      option-text="name"
      v-if="roles.includes('author')"
    ></va-autocomplete-input>
    <va-save-button :saving="saving"></va-save-button>
  </va-form>
</template>

<script>
export default {
  props: ["id", "title", "item"],
  data() {
    return {
      roles: [],
      saving: false,
    };
  },
};
</script>
