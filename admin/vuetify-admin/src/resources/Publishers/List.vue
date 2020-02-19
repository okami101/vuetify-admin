<template>
  <va-list>
    <va-datagrid
      :fields="['id', 'name', 'founder', 'headquarter', 'opening_date']"
      :filters="[
        { source: 'q', icon: 'mdi-magnify', alwaysOn: true },
        'name',
        'founder',
        'headquarter'
      ]"
    >
      <template v-slot:row-actions="{ item }">
        <va-show-button :item="item"></va-show-button>
        <va-edit-button :item="item"></va-edit-button>
        <va-delete-button :item="item"></va-delete-button>
      </template>
    </va-datagrid>
  </va-list>
</template>
