<template>
  <va-list
    :fields="[
      'id',
      {
        source: 'photo',
        virtual: true,
        type: 'image',
        options: {
          preview: 'thumbnails.small'
        }
      },
      'name'
    ]"
    :filters="['q', 'name']"
    v-slot="props"
  >
    <va-datagrid v-bind="props" row-click="show"></va-datagrid>
  </va-list>
</template>
