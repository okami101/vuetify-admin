<template>
  <va-edit :resource="resource">
    <template v-slot="props">
      <publishers-form v-bind="props"></publishers-form>
    </template>
  </va-edit>
</template>

<script>
export default {
  props: ["resource"]
};
</script>
