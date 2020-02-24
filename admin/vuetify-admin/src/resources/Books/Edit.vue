<template>
  <va-edit :resource="resource">
    <template v-slot="props">
      <books-form v-bind="props"></books-form>
    </template>
  </va-edit>
</template>

<script>
export default {
  props: ["resource"]
};
</script>
