<template>
  <va-list
    :fields="[
      'id',
      'name',
      'founder',
      'headquarter',
      { source: 'opening_date', type: 'date', options: { format: 'long' } },
      { source: 'books_count', type: 'number' }
    ]"
    :filters="['q', 'name', 'founder', 'headquarter']"
    :include="['books_count']"
  >
    <template v-slot="props">
      <va-datagrid v-bind="props"></va-datagrid>
    </template>
  </va-list>
</template>
