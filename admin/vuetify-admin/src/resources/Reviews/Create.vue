<template>
  <va-create :resource="resource">
    <template v-slot="props">
      <reviews-form v-bind="props"></reviews-form>
    </template>
  </va-create>
</template>

<script>
export default {
  props: ["resource"]
};
</script>
