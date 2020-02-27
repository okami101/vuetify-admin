<template>
  <va-list
    :fields="[
      'id',
      'name',
      { source: 'type', type: 'enum' },
      'founder',
      'headquarter',
      { source: 'active', type: 'boolean' },
      { source: 'opening_date', type: 'date', options: { format: 'long' } },
      { source: 'books_count', type: 'number' }
    ]"
    :filters="[
      'q',
      'name',
      'founder',
      'headquarter',
      { source: 'active', type: 'boolean' }
    ]"
    :include="['books_count']"
    v-slot="props"
  >
    <va-datagrid v-bind="props" row-click="show"></va-datagrid>
  </va-list>
</template>
