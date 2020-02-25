<template>
  <va-edit v-bind="{ resource, item }">
    <template v-slot="props">
      <books-form v-bind="props"></books-form>
    </template>
  </va-edit>
</template>

<script>
export default {
  props: ["permissions", "resource", "item"]
};
</script>
