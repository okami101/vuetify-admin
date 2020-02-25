<template>
  <va-edit v-bind="{ resource, item }">
    <template v-slot="props">
      <publishers-form v-bind="props"></publishers-form>
    </template>
  </va-edit>
</template>

<script>
export default {
  props: ["resource", "item"]
};
</script>
