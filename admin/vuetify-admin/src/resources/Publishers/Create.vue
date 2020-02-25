<template>
  <va-create v-bind="{ resource }">
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
