<template>
  <va-edit :resource="resource">
    <template v-slot="props">
      <reviews-form v-bind="props"></reviews-form>
    </template>
  </va-edit>
</template>

<script>
export default {
  props: ["resource"]
};
</script>
