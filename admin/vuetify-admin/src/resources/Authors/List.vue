<template>
  <va-list :filters="['q', 'name']" v-slot="props">
    <va-datagrid
      :fields="[
        'id',
        {
          source: 'photo',
          type: 'image',
          options: {
            preview: 'thumbnails.small'
          }
        },
        'name'
      ]"
      v-bind="props"
      row-click="show"
    ></va-datagrid>
  </va-list>
</template>
