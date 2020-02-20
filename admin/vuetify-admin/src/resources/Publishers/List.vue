<template>
  <va-list
    :filters="[
      { source: 'q', icon: 'mdi-magnify', alwaysOn: true },
      'name',
      'founder',
      'headquarter'
    ]"
  >
    <template v-slot="props">
      <va-datagrid
        v-bind="props"
        :fields="['id', 'name', 'founder', 'headquarter', 'opening_date']"
        row-click="show"
      >
        <template v-slot:row-actions="{ item }">
          <va-edit-button :item="item"></va-edit-button>
          <va-delete-button :item="item"></va-delete-button>
        </template>
      </va-datagrid>
    </template>
  </va-list>
</template>
