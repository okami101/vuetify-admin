<template>
  <va-show v-bind="{ resource, item }">
    <va-simple-show>
      <va-text-field source="name"></va-text-field>
      <va-text-field source="founder"></va-text-field>
      <va-text-field source="description"></va-text-field>
      <va-text-field source="headquarter"></va-text-field>
      <va-date-field source="opening_date" format="long"></va-date-field>
    </va-simple-show>
  </va-show>
</template>

<script>
export default {
  props: ["resource", "item"]
};
</script>
