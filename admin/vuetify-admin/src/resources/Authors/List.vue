<template>
  <va-list :fields="['id', 'name']" :filters="['q', 'name']" v-slot="props">
    <va-datagrid v-bind="props"></va-datagrid>
  </va-list>
</template>
