<template>
  <va-create v-bind="{ resource }">
    <template v-slot="props">
      <books-form v-bind="props"></books-form>
    </template>
  </va-create>
</template>

<script>
export default {
  props: ["resource"]
};
</script>
