<template>
  <va-list
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
