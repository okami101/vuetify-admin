<template>
  <va-create :resource="resource">
    <template v-slot="props">
      <publishers-form v-bind="props"></publishers-form>
    </template>
  </va-create>
</template>

<script>
export default {
  props: ["resource"]
};
</script>
