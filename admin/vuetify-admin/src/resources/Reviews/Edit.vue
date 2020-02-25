<template>
  <va-edit v-bind="{ resource, item }">
    <template v-slot="props">
      <reviews-form v-bind="props"></reviews-form>
    </template>
  </va-edit>
</template>

<script>
export default {
  props: ["resource", "item"]
};
</script>
