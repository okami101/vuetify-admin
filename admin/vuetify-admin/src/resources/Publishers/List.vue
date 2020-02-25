<template>
  <va-list
    v-bind="{ resource }"
    :fields="[
      'id',
      'name',
      'founder',
      'headquarter',
      { source: 'opening_date', type: 'date', options: { format: 'long' } }
    ]"
    :filters="['q', 'name', 'founder', 'headquarter']"
  >
    <template v-slot="props">
      <va-datagrid v-bind="props"></va-datagrid>
    </template>
  </va-list>
</template>

<script>
export default {
  props: ["resource"]
};
</script>
